import { AppStore } from "./app";
import { VibraphoneStore } from "./vibraphone";
import { BassStore } from "./bass";
import { DrumsStore } from "./drums";
import { MachineStore } from "./machine";
import { HihatMachineState, HihatState } from "vmmx-schema";
export declare class StateStore {
    appStore: AppStore;
    machine: MachineStore;
    vibraphone: VibraphoneStore;
    bass: BassStore;
    drums: DrumsStore;
    constructor(appStore: AppStore);
    hihatMachine: HihatMachineState;
    hihat: HihatState;
}
