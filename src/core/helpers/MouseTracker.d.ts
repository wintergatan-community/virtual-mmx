import { Point } from "../../core/helpers/functions";
export declare class MouseTracker {
    private element?;
    mousePos: import("./solid").Signal<Point | undefined>;
    scale: import("./solid").Signal<{
        x: (val: number) => number;
        y: (val: number) => number;
    }>;
    setElement(element: SVGRectElement | SVGSVGElement): void;
    private mouseMove;
    forceUpdate(e: MouseEvent): void;
}
