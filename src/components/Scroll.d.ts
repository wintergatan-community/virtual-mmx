import { Signal } from "../core/helpers/solid";
import { ScrollContainerStore } from "./scrollContainerStore";
interface ScrollProps {
    scroll: ScrollContainerStore;
    children: JSX.Element;
}
export declare const ScrollBody: (props: ScrollProps) => JSX.Element;
interface ScrollByProps {
    scroll: ScrollContainerStore;
    axis: "x" | "y";
    by: Signal<number>;
    children: JSX.Element;
}
export declare const TranslateOnScroll: (props: ScrollByProps) => JSX.Element;
export {};
