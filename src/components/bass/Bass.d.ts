import { BassDisplayStore } from "./bassDisplay";
import { MouseTracker } from "../../core/helpers/MouseTracker";
export declare const BassContext: import("solid-js/types/reactive/signal").Context<{
    bass: BassDisplayStore;
    mouse: MouseTracker;
}>;
export declare const Bass: () => JSX.Element;
