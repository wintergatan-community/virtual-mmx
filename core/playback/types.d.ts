import { ChannelPart } from "./channelPart";
import { VibraphoneChannel, BassString, DrumType, TickedDropEvent, Note } from "vmmx-schema";
export interface VmmxInstrument<ChannelType extends string | number | symbol, DropEventKind> {
    channels: Record<ChannelType, VmmxInstrumentChannel>;
    addNoteFromEvent(event: DropEventKind & TickedDropEvent): void;
    onToneLoad(): void;
}
export interface VmmxInstrumentChannel {
    channelPart: ChannelPart;
    triggerStrike(time?: number): void;
    note?: Note;
}
export declare const vibraphoneBars: VibraphoneChannel[];
export declare const bassStrings: BassString[];
export declare const drumTypes: DrumType[];
