import { Part } from "tone";
import { VibraphoneChannel, DrumType, BassString } from "vmmx-schema";

const partOptions = {
	loop: true,
	loopStart: 0,
	loopEnd: "16m",
};

const newPart = () => new Part(partOptions);

/**
 * Represents the [[Tone.Part]]s corresponding to each instrument channel.
 *
 * @export
 * @class MmxParts
 */
export class MmxParts {
	readonly vibraphone: { readonly [c in VibraphoneChannel]: Part };
	readonly bass: { readonly [s in BassString]: Part };
	readonly drums: { readonly [d in DrumType]: Part };
	*getGenerator() {
		for (const [, part] of Object.entries(this.vibraphone)) {
			yield part;
		}
		for (const [, part] of Object.entries(this.bass)) {
			yield part;
		}
		for (const [, part] of Object.entries(this.drums)) {
			yield part;
		}
	}
	forEach(func: (part: Part) => void): void {
		const gen = this.getGenerator();
		let part: IteratorResult<Part, void>;
		while (((part = gen.next()), !part.done)) {
			func(part.value);
		}
	}
	constructor() {
		this.vibraphone = {
			1: newPart(),
			2: newPart(),
			3: newPart(),
			4: newPart(),
			5: newPart(),
			6: newPart(),
			7: newPart(),
			8: newPart(),
			9: newPart(),
			10: newPart(),
			11: newPart(),
		};
		this.bass = {
			1: newPart(),
			2: newPart(),
			3: newPart(),
			4: newPart(),
		};
		this.drums = {
			bassdrum: newPart(),
			hihat: newPart(),
			snare: newPart(),
		};
	}
	start(time: number | string) {
		this.forEach((part) => part.start(time));
	}
	stop(time: number | string) {
		this.forEach((part) => part.stop(time));
	}
}

export interface MmxSynths<TVibes, TBass, TDrums> {
	vibraphone: TVibes;
	bass: TBass;
	drums: { [d in DrumType]: TDrums };
}

// for(let channel of vibraphoneChannels) {
// 	this.vibraphone[channel] = new PartData(
// 		tonePart: new Part(partOptions),
// 		tuning: vibraphoneChannelToNote(channel),
// 		descriptor: vibraphoneChannelToNote(channel)
// 	)
// }
