import { BassState, BassString, Note } from "vmmx-schema";
import { AppStore } from "./app";
export declare class BassStore implements BassState {
    appStore: AppStore;
    capos: Record<BassString, number>;
    tuning: Record<BassString, Note>;
    stringStores: Record<BassString, BassStringStore>;
    constructor(appStore: AppStore);
}
export declare class BassStringStore {
    tuningObj: Record<BassString, Note>;
    caposObj: Record<BassString, number>;
    string: BassString;
    get tuning(): Note;
    get capo(): number;
    moveCapo(fret: number): void;
    constructor(string: BassString, tuningObj: Record<BassString, Note>, caposObj: Record<BassString, number>);
}
