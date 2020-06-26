import { ChannelPart } from "./channelPart";
import {
	VibraphoneChannel,
	BassString,
	DrumType,
	TickedDropEvent,
	Note,
} from "vmmx-schema";

export interface VmmxInstrument<
	ChannelType extends string | number | symbol,
	DropEventKind
> {
	channels: Record<ChannelType, VmmxInstrumentChannel>;
	addNoteFromEvent(event: DropEventKind & TickedDropEvent): void;
	onToneLoad(): void; // preferably async, but get "Uncaught ReferenceError: regeneratorRuntime is not defined"
}

export interface VmmxInstrumentChannel {
	channelPart: ChannelPart;
	triggerStrike(time?: number): void;
	note?: Note;
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
export const drumTypes: DrumType[] = ["bassdrum", "hihat", "snare"];
