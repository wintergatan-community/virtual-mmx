/// <reference types="react" />
import { Point } from "../../core/helpers/functions";
export declare class MouseTracker {
    private element;
    mousePos: Point | undefined;
    scale: Point | undefined;
    box: DOMRect | undefined;
    setElement(element: SVGSVGElement): void;
    update(e: React.MouseEvent<SVGSVGElement, MouseEvent>): void;
    leave(): void;
}
