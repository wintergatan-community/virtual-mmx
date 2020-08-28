import { PerformanceStore } from "./performance";
import { JointEventTimeline } from "../core/eventTimelines/types/other";
import MidiUse from "../midiTesting";
import { Program } from "vmmx-schema";
import { VmmxPlayer } from "../core/playback/player";
export declare const AppContext: import("solid-js/types/reactive/signal").Context<AppStore>;
export declare class AppStore {
    performance: PerformanceStore;
    jointTimelines: {
        bass: Record<import("vmmx-schema").BassString, JointEventTimeline<import("../core/eventTimelines/concrete").BassDropE>>;
        drums: Record<import("../toFutureSchema").DrumTypeTOFIX, JointEventTimeline<import("../core/eventTimelines/concrete").HiHatDropE>>;
        vibraphone: Record<import("vmmx-schema").VibraphoneChannel, JointEventTimeline<import("../core/eventTimelines/concrete").VibraphoneDropE>>;
    };
    midiUse: MidiUse;
    player: VmmxPlayer;
    loadProgram(program: Program): void;
    get prog(): {
        bass: Record<import("vmmx-schema").BassString, import("../core/eventTimelines/concrete").BassDropEventTimeline>;
        drums: Record<import("../toFutureSchema").DrumTypeTOFIX, import("../core/eventTimelines/concrete").DrumsDropEventTimeline>;
        vibraphone: Record<import("vmmx-schema").VibraphoneChannel, import("../core/eventTimelines/concrete").VibraphoneDropEventTimeline>;
    };
    get perf(): {
        bass: Record<import("vmmx-schema").BassString, import("../core/eventTimelines/concrete").BassDropEventTimeline>;
        drums: Record<import("../toFutureSchema").DrumTypeTOFIX, import("../core/eventTimelines/concrete").DrumsDropEventTimeline>;
        vibraphone: Record<import("vmmx-schema").VibraphoneChannel, import("../core/eventTimelines/concrete").VibraphoneDropEventTimeline>;
    };
    setupTesting(): void;
}
