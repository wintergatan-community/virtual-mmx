import { Signal } from "../core/helpers/solid";
interface TranslateGroupProps {
    x?: Signal<number>;
    y?: Signal<number>;
    children: JSX.Element;
}
export declare const TranslateGroup: (props: TranslateGroupProps) => JSX.Element;
export {};
