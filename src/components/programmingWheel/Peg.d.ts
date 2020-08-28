import { Signal } from "../../core/helpers/solid";
interface PegProps {
    pegTick: Signal<number>;
    activeDivision: boolean;
    spawnsEvent: boolean;
    click?: () => void;
}
export declare const Peg: (props: PegProps) => JSX.Element;
export {};
