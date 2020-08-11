import { PolylineEventTimeline } from "./polyline";
import { EventBase } from "../types/other";
import { Curve } from "../types/curves";

export abstract class SegmentEventTimeline<
	E extends EventBase
> extends PolylineEventTimeline<E> {
	abstract isStarting(event: E): boolean;

	eventCanBePlacedOnCurve(event: E, curve: Curve<E> | null) {
		if (curve) {
			if (curve.end || this.isStarting(event)) {
				return false;
			}
		} else if (!this.isStarting(event)) {
			return false;
		}
		return true;
	}
}
