import { DrumDropEvent, TickedDropEvent, DrumType } from "vmmx-schema";
import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { ChannelPart } from "../channelPart";
import { DrumsStore } from "../../../stores/drums";
declare type DrumTypeTOFIX = DrumType | "crash";
export declare class DrumsInstrument implements VmmxInstrument<DrumTypeTOFIX, DrumDropEvent> {
    drumsStore: DrumsStore;
    channels: Record<DrumTypeTOFIX, DrumsChannel>;
    constructor(drumsStore: DrumsStore);
    onToneLoad(): void;
    addNoteFromEvent(event: DrumDropEvent & TickedDropEvent): void;
}
declare class DrumsChannel implements VmmxInstrumentChannel {
    channelPart: ChannelPart;
    private drumSynth?;
    drum: DrumTypeTOFIX;
    constructor(drum: DrumTypeTOFIX);
    triggerStrike(time?: number): void;
    onToneLoad(): void;
}
export {};
