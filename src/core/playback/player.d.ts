import { AppStore } from "../../stores/app";
import { VibraphoneInstrument } from "./instruments/vibraphone";
import { BassInstrument } from "./instruments/bass";
import { DrumsInstrument } from "./instruments/drums";
import { ToneChannel } from "./toneChannel";
import { EventBase } from "../eventTimelines/types/other";
import { HiHatMachineSound } from "./sounds/hiHatMachine";
import { MutingLeverSound } from "./sounds/mutingLever";
/** Container for playback state */
export declare class VmmxPlayer {
    appStore: AppStore;
    running: import("../helpers/solid").Signal<boolean>;
    currentTick: import("../helpers/solid").Signal<number>;
    toneLoaded: import("../helpers/solid").Signal<boolean>;
    instruments: {
        vibraphone: VibraphoneInstrument;
        bass: BassInstrument;
        drums: DrumsInstrument;
    };
    sounds: {
        hiHatMachine: HiHatMachineSound;
        mutingLever: MutingLeverSound;
    };
    eventTimelineToneChannels: ToneChannel<EventBase>[];
    constructor(appStore: AppStore);
    get program(): import("../../stores/program").ProgramStore;
    updateCurrentTickLoop: () => void;
    play(): void;
    pause(): void;
    restart(): void;
}
