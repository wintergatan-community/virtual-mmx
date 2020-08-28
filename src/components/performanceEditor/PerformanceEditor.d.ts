import { ScrollContainerStore } from "../scrollContainerStore";
import { PerformanceEditorStore } from "./performanceEditorStore";
export declare const PerformanceEditorContext: import("solid-js/types/reactive/signal").Context<{
    perf: PerformanceEditorStore;
    scroll: ScrollContainerStore;
}>;
export declare const PerformanceEditor: () => JSX.Element;
