import { PerformanceAction } from "./other";
export declare class PerformanceEditorStore {
    performanceActions: PerformanceAction[];
    selectedAction: import("../../core/helpers/solid").Signal<"Muting Levers" | "Bass Capo" | "BPM" | "Hihat Opening" | undefined>;
    setAction(action: PerformanceAction): void;
    open: import("../../core/helpers/solid").Signal<boolean>;
    show: () => void;
    hide(): void;
    toggleShow(): void;
}
