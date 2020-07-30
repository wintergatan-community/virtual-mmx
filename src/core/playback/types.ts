import { VibraphoneChannel, BassString } from "vmmx-schema";
import { JointToneChannel } from "./toneChannel";
import { DrumTypeTOFIX } from "./instruments/drums";

export interface VmmxInstrument<ChannelType extends string | number | symbol> {
	channels: Record<ChannelType, VmmxInstrumentChannel>;
	onToneLoad(): void; // preferably async, but get "Uncaught ReferenceError: regeneratorRuntime is not defined"
}

export interface VmmxInstrumentChannel {
	toneChannels: JointToneChannel<any>; // TODO maybe not "any", not sure yet
	triggerStrike(time?: number): void;
}

// TODO this should be part of schema, and it should be VibraphoneBar
export const vibraphoneBars: VibraphoneChannel[] = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
];
export const bassStrings: BassString[] = [1, 2, 3, 4];
export const drumTypes: DrumTypeTOFIX[] = [
	"bassdrum",
	"hihat",
	"snare",
	"crash",
];
export const instruments: InstrumentName[] = ["bass", "drums", "vibraphone"];
export type InstrumentName = "bass" | "drums" | "vibraphone";
