import { Signal } from "../../core/helpers/solid";
import { HiHatMachineMode } from "../../toFutureSchema";
interface ModeSelectorProps {
    currentMode: Signal<HiHatMachineMode>;
    selectMode: (mode: HiHatMachineMode) => void;
}
export declare const ModeSelector: (props: ModeSelectorProps) => JSX.Element;
export {};
