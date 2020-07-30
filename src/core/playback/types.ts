import { VibraphoneChannel, BassString, DrumType } from "vmmx-schema";
import { ToneChannel } from "./toneChannel";
import { DrumTypeTOFIX } from "./instruments/drums";

export interface VmmxInstrument<ChannelType extends string | number | symbol> {
	channels: Record<ChannelType, VmmxInstrumentChannel>;
	// addNoteFromEvent(event: DropEventKind & TickedDropEvent): void;
	onToneLoad(): void; // preferably async, but get "Uncaught ReferenceError: regeneratorRuntime is not defined"
}

export interface VmmxInstrumentChannel {
	performanceChannel: ToneChannel<any>; // TODO maybe not "any", not sure yet
	programChannel: ToneChannel<any>;
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
