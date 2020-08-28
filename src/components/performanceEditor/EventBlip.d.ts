import { EventBase } from "../../core/eventTimelines/types/other";
import { Bounds } from "./EventCurve";
import { Curve } from "../../core/eventTimelines/types/curves";
interface EventBlipProps<E extends EventBase> {
    curve: Curve<E>;
    bounds: Bounds;
    colorOf: (curve: Curve<E> | null) => string;
    selected: boolean;
    setSelected: (selected: boolean) => void;
    dragging: boolean;
    setDragging: (dragging: boolean) => void;
    value: (event: E) => number;
    valToPixel: (value: number) => number;
}
export declare function EventBlip<E extends EventBase>(props: EventBlipProps<E>): JSX.Element;
export {};
