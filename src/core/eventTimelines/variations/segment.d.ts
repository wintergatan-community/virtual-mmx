import { PolylineEventTimeline } from "./polyline";
import { EventBase } from "../types/other";
import { Curve } from "../types/curves";
export declare abstract class SegmentEventTimeline<E extends EventBase> extends PolylineEventTimeline<E> {
    abstract isStarting(event: E): boolean;
    eventCanBePlacedOnCurve(event: E, curve: Curve<E> | null): boolean;
}
