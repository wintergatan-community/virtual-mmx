import { ProgramStore } from "./program";
import { PerformanceMetadata, State, TimedEvent } from "vmmx-schema";
import { MuteEventTimeline, BassDropEventTimeline, HiHatDropEventTimeline, VibraphoneDropEventTimeline, VibraphoneVibratoEventTimeline, CapoEventTimeline, HiHatMachineModeEventTimeline } from "../core/eventTimelines/concrete";
export declare class PerformanceStore {
    metadata: PerformanceMetadata;
    program: ProgramStore;
    initialState: State;
    events: TimedEvent[];
    eventTimelines: {
        performanceDrop: {
            bass: Record<import("vmmx-schema").BassString, BassDropEventTimeline>;
            drums: Record<import("../toFutureSchema").DrumTypeTOFIX, import("../core/eventTimelines/concrete").DrumsDropEventTimeline>;
            vibraphone: Record<import("vmmx-schema").VibraphoneChannel, VibraphoneDropEventTimeline>;
        };
        machine: {
            channelMute: Record<import("../toFutureSchema").ChannelGroupTOFIX, MuteEventTimeline>;
        };
        vibraphone: {
            vibrato: VibraphoneVibratoEventTimeline;
        };
        hihat: {
            hatOpen: HiHatDropEventTimeline;
        };
        bass: {
            capo: Record<import("vmmx-schema").BassString, CapoEventTimeline>;
        };
        hiHatMachine: {
            mode: HiHatMachineModeEventTimeline;
        };
    };
    constructor();
}
