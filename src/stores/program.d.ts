import { Program, ProgramMetadata } from "vmmx-schema";
import { DrumTypeTOFIX } from "../toFutureSchema";
import { StateStore } from "./state";
import { BassDropEventTimeline, VibraphoneDropEventTimeline, DrumsDropEventTimeline } from "../core/eventTimelines/concrete";
export declare class ProgramStore {
    metadata: ProgramMetadataStore;
    state: StateStore;
    dropEvents: never[];
    dropEventTimelines: {
        bass: Record<import("vmmx-schema").BassString, BassDropEventTimeline>;
        drums: Record<DrumTypeTOFIX, DrumsDropEventTimeline>;
        vibraphone: Record<import("vmmx-schema").VibraphoneChannel, VibraphoneDropEventTimeline>;
    };
    serialize(): Program;
    constructor();
    loadProgram(program: Program): void;
}
declare class ProgramMetadataStore implements ProgramMetadata {
    title: string;
    author: string;
    tpq: 240;
    version: string;
    readonly length = 61440;
    procrastination: number;
}
export {};
