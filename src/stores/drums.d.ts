import { HihatState } from "vmmx-schema";
import { AppStore } from "./app";
export declare class DrumsStore {
    appStore: AppStore;
    hihatStore: HihatStore;
    constructor(appStore: AppStore);
}
declare class HihatStore implements HihatState {
    closed: boolean;
}
export {};
