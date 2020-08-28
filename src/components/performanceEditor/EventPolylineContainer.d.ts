import { EventBase } from "../../core/eventTimelines/types/other";
import { PolylineEventTimeline } from "../../core/eventTimelines/variations/polyline";
import { Curve } from "../../core/eventTimelines/types/curves";
interface EventPolylineContainerProps<E extends EventBase> {
    timeline: PolylineEventTimeline<E>;
    shouldShow: (curve: Curve<E>) => boolean;
    colorOf: (curve: Curve<E> | null) => string;
    value: (event: E) => number;
    valToPixel: (value: number) => number;
    newEventAt: (tick: number, value: number) => E;
}
export declare function EventPolylineContainer<E extends EventBase>(props: EventPolylineContainerProps<E>): JSX.Element;
export {};
