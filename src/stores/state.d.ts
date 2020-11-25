import { VibraphoneStore } from "./vibraphone";
import { BassStore } from "./bass";
import { DrumsStore } from "./drums";
import { MachineStore } from "./machine";
import { HihatMachineState, HihatState } from "vmmx-schema";
export declare class StateStore {
    machine: MachineStore;
    vibraphone: VibraphoneStore;
    bass: BassStore;
    drums: DrumsStore;
    hihatMachine: HihatMachineState;
    hihat: HihatState;
}
