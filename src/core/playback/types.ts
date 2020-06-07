import { Part } from "tone";
import { VibraphoneChannel, DrumType, BassString } from "vmmx-schema";
import PartData from "./partData";
import { global } from "../../contexts/StoreContext";
import { bassStringToNote } from "../helpers";

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
		// vibraphone
		const vibraphoneTuning = global.program.state.vibraphone.notes;
		this.vibraphone = Object.fromEntries(
			Object.entries(vibraphoneTuning).map(([channel, note]) => [
				channel, // key
				new PartData(newPart(), note, note), // value
			])
		) as { readonly [c in VibraphoneChannel]: PartData };

		// bass
		const bassTuning = global.program.state.bass.tuning;
		this.bass = Object.fromEntries(
			Object.entries(bassTuning).map(([string]) => [
				string, // key
				new PartData(
					newPart(),
					bassStringToNote((string as unknown) as BassString, bassTuning),
					"Str" + string
				), // value
			])
		) as { readonly [c in BassString]: PartData };

		// drums
		this.drums = Object.fromEntries(
			["bassdrum", "hihat", "snare"].map((drum) => [
				drum, // key
				new PartData(newPart(), "A#0", drum), // value
			])
		) as { readonly [c in DrumType]: PartData };
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
