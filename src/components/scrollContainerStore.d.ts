import { Signal } from "../core/helpers/solid";
interface ScrollAxisStoreProps {
    visibleLeast?: Signal<number>;
    pixelsPerUnit?: Signal<number>;
    visiblePixelRange?: Signal<number>;
    total?: Signal<number>;
    circular?: boolean;
}
export declare class ScrollAxisStore {
    visibleLeast: Signal<number>;
    pixelsPerUnit: Signal<number>;
    visiblePixelRange: Signal<number>;
    total: Signal<number>;
    circular: boolean;
    constructor(c?: ScrollAxisStoreProps);
    visibleRange: () => number;
    visibleMost: () => number;
    toPixel: (val: number) => number;
    fromPixel: (val: number) => number;
    zoom: (factor: number, fixedPoint: number) => void;
    scroll: (dy: number) => void;
    visibleArrayOf<T>(data: Signal<T[]>, getElementPos: (element: T) => number, type?: "circular"): import("../core/helpers/solid").Getter<T[]>;
}
interface ScrollContainerStoreProps {
    x?: ScrollAxisStoreProps;
    y?: ScrollAxisStoreProps;
    circular?: boolean;
}
export declare class ScrollContainerStore {
    x: ScrollAxisStore;
    y: ScrollAxisStore;
    constructor(c?: ScrollContainerStoreProps);
    inVisibleRange: (x: number) => boolean;
}
export {};
