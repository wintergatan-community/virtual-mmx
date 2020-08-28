import { ProgrammingWheelDisplayStore } from "./programmingWheelDisplay";
import { ScrollContainerStore } from "../scrollContainerStore";
import { MouseTracker } from "../../core/helpers/MouseTracker";
export declare const ProgrammingWheelContext: import("solid-js/types/reactive/signal").Context<{
    wheel: ProgrammingWheelDisplayStore;
    scroll: ScrollContainerStore;
    mouse: MouseTracker;
}>;
export declare const ProgrammingWheel: () => JSX.Element;
