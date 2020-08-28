import { Program, ProgramMetadata } from "vmmx-schema";
import { AppStore } from "./app";
import { DrumTypeTOFIX } from "../toFutureSchema";
import { StateStore } from "./state";
import { BassDropEventTimeline, VibraphoneDropEventTimeline, DrumsDropEventTimeline } from "../core/eventTimelines/concrete";
export declare class ProgramStore {
    appStore: AppStore;
    metadata: ProgramMetadataStore;
    state: StateStore;
    dropEvents: never[];
    dropEventTimelines: {
        bass: Record<import("vmmx-schema").BassString, BassDropEventTimeline>;
        drums: Record<DrumTypeTOFIX, DrumsDropEventTimeline>;
        vibraphone: Record<import("vmmx-schema").VibraphoneChannel, VibraphoneDropEventTimeline>;
    };
    serialize(): Program;
    constructor(appStore: AppStore);
    loadProgram(program: Program): void;
}
declare class ProgramMetadataStore implements ProgramMetadata {
    appStore: AppStore;
    title: string;
    author: string;
    tpq: 240;
    version: string;
    readonly length = 61440;
    procrastination: number;
    constructor(appStore: AppStore);
}
export {};
