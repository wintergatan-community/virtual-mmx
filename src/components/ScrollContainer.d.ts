import { Signal } from "../core/helpers/solid";
interface ScrollContainerProps<T> {
    start: Signal<number>;
    span: Signal<number>;
    data: Signal<T[]>;
    getValue(item: T): number;
    children: (e: number) => JSX.Element;
}
export declare function ScrollContainer<T>(props: ScrollContainerProps<T>): JSX.Element;
export {};
