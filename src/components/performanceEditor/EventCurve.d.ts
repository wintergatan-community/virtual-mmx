import { Curve } from "../../core/eventTimelines/types/curves";
import { EventBase } from "../../core/eventTimelines/types/other";
export interface Bounds {
    left: number;
    right: number;
}
interface EventCurveProps<E extends EventBase> {
    curve: Curve<E>;
    bounds: {
        start: Bounds;
        end: Bounds;
    };
    selectedEvent: E | undefined;
    setSelected: (event: E | undefined) => void;
    dragging: boolean;
    setDragging: (dragging: boolean) => void;
    shouldShow: (curve: Curve<E>) => boolean;
    colorOf: (curve: Curve<E> | null) => string;
    value: (event: E) => number;
    valToPixel: (value: number) => number;
}
export declare function EventCurve<E extends EventBase>(props: EventCurveProps<E>): JSX.Element;
export {};
