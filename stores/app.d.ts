import { Program, ProgramMetadata, MachineState } from "vmmx-schema";
import { VmmxPlayer } from "../core/playback/player";
import { BassStore } from "./bass";
import { DrumsStore } from "./drums";
import { VibraphoneStore } from "./vibraphone";
export declare class AppStore {
    program: ProgramStore;
    player: VmmxPlayer;
    loadProgram(program: Program): void;
}
export declare class ProgramStore {
    appStore: AppStore;
    metadata: ProgramMetadataStore;
    state: StateStore;
    dropEvents: never[];
    serialize(): Program;
    constructor(appStore: AppStore);
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
declare class StateStore {
    appStore: AppStore;
    machine: MachineStore;
    vibraphone: VibraphoneStore;
    bass: BassStore;
    drums: DrumsStore;
    constructor(appStore: AppStore);
}
declare class MachineStore implements MachineState {
    appStore: AppStore;
    mute: {
        bassdrum: boolean;
        hihat: boolean;
        snare: boolean;
        vibraphone: boolean;
        bass: boolean;
    };
    bpm: number;
    flywheelConnected: boolean;
    constructor(appStore: AppStore);
}
export {};
