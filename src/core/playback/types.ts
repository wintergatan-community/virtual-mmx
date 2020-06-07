import { Part } from "tone";
import { VibraphoneChannel, DrumType, BassString, Note } from "vmmx-schema";
import PartData from "./partData";
import { bassStringToNote, vibraphoneChannelToNote } from "../helpers";
import { vibraphoneChannels, bassStrings, drumTypes } from "./constants";

const partOptions = {
	loop: true,
	loopStart: 0,
	// for some reason this only seems to work with ticks
	loopEnd: 240 * 4 * 16 + "i",
};

const newPart = () => new Part(partOptions);

/**
 * Represents the [[Tone.Part]]s corresponding to each instrument channel.
 *
 * @export
 * @class MmxParts
 */
export class MmxParts {
	readonly vibraphone: { readonly [c in VibraphoneChannel]: PartData };
	readonly bass: { readonly [s in BassString]: PartData };
	readonly drums: { readonly [d in DrumType]: PartData };
	*getGenerator() {
		for (const part of Object.values(this.vibraphone)) {
			yield part;
		}
		for (const part of Object.values(this.bass)) {
			yield part;
		}
		for (const part of Object.values(this.drums)) {
			yield part;
		}
	}
	forEach(func: (part: PartData) => void): void {
		const gen = this.getGenerator();
		let part: IteratorResult<PartData, void>;
		while (((part = gen.next()), !part.done)) {
			func(part.value);
		}
	}
	constructor() {
		this.vibraphone = buildPart(
			vibraphoneChannels,
			vibraphoneChannelToNote,
			(_, note) => note
		);

		this.bass = buildPart(
			bassStrings,
			bassStringToNote,
			(string) => "Str" + string
		);

		this.drums = buildPart(
			drumTypes,
			() => "A#1", // TODO handle non-note instruments better
			(drum) => drum[0].toUpperCase()
		);
	}
	start(time: number | string) {
		this.forEach((part) => part.tonePart.start(time));
	}
	stop(time: number | string) {
		this.forEach((part) => part.tonePart.stop(time));
	}
}

export interface MmxSynths<TVibes, TBass, TDrums> {
	vibraphone: TVibes;
	bass: TBass;
	drums: { [d in DrumType]: TDrums };
}

function buildPart<T>(
	keys: T[], // i.e. channels, strings
	keyToNoteFunc: (key: T) => Note,
	descriptorFunc: (key: T, note: Note) => string // return column header string
) {
	return Object.fromEntries(
		keys.map((key) => {
			const note = keyToNoteFunc(key);
			return [key, new PartData(newPart(), note, descriptorFunc(key, note))];
		})
	);
}
