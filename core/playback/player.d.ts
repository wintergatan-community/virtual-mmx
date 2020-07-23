import { TickedDropEvent } from "vmmx-schema";
import { AppStore } from "../../stores/app";
import { VibraphoneInstrument } from "./instruments/vibraphone";
import { BassInstrument } from "./instruments/bass";
import { DrumsInstrument } from "./instruments/drums";
export declare class VmmxPlayer {
    appStore: AppStore;
    running: boolean;
    currentTick: number;
    toneLoaded: boolean;
    instruments: {
        vibraphone: VibraphoneInstrument;
        bass: BassInstrument;
        drums: DrumsInstrument;
    };
    constructor(appStore: AppStore);
    get program(): import("../../stores/app").ProgramStore;
    updateCurrentTickLoop(): void;
    loadEvents(dropEvents: TickedDropEvent[]): void;
    play(): void;
    pause(): void;
    restart(): void;
}
