import { HihatMachineState } from "vmmx-schema";
import { AppStore } from "./app";
export declare class HihatMachineStore implements HihatMachineState {
    appStore: AppStore;
    setting: string;
    constructor(appStore: AppStore);
}
