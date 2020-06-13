export default "";
// import { Part } from "tone";
// import { VibraphoneChannel, DrumType, BassString, Note } from "vmmx-schema";
// import PartData from "./partData";
// import {
// 	vibraphoneChannels,
// 	bassStrings,
// 	drumTypes,
// 	createVibraphoneTrigger,
// 	createBassTrigger,
// 	vibraphoneChannelToNote,
// 	bassStringToNote,
// } from "./instruments";

// /**
//  * Represents the [[Tone.Part]]s corresponding to each instrument channel.
//  *
//  * @export
//  * @class MmxParts
//  */
// export class MmxParts {
// 	readonly vibraphone: { readonly [c in VibraphoneChannel]: PartData };
// 	readonly bass: { readonly [s in BassString]: PartData };
// 	readonly drums: { readonly [d in DrumType]: PartData };
// 	*getGenerator() {
// 		for (const part of Object.values(this.vibraphone)) {
// 			yield part;
// 		}
// 		for (const part of Object.values(this.bass)) {
// 			yield part;
// 		}
// 		for (const part of Object.values(this.drums)) {
// 			yield part;
// 		}
// 	}
// 	forEach(func: (part: PartData) => void): void {
// 		const gen = this.getGenerator();
// 		let part: IteratorResult<PartData, void>;
// 		while (((part = gen.next()), !part.done)) {
// 			func(part.value);
// 		}
// 	}
// 	constructor() {
// 		this.vibraphone = buildParts(
// 			vibraphoneChannels,
// 			vibraphoneChannelToNote,
// 			createVibraphoneTrigger,
// 			(_, note) => note
// 		);

// 		this.bass = buildParts(
// 			bassStrings,
// 			bassStringToNote,
// 			createBassTrigger,
// 			(string) => "Str" + string
// 		);

// 		this.drums = buildParts(
// 			drumTypes,
// 			() => "A#1", // TODO handle non-note instruments better
// 			() => () => {},
// 			(drum) => drum[0].toUpperCase()
// 		);
// 	}
// 	start(time: number | string) {
// 		this.forEach((part) => part.tonePart.start(time));
// 	}
// 	stop(time: number | string) {
// 		this.forEach((part) => part.tonePart.stop(time));
// 	}
// }

// export interface MmxSynths<TVibes, TBass, TDrums> {
// 	vibraphone: TVibes;
// 	bass: TBass;
// 	drums: { [d in DrumType]: TDrums };
// }
