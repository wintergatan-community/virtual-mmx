import { EventTimeline } from "../base";
import { EventBase, CurveDif, CurveRemoveDif } from "../types/other";
import { Curve } from "../types/curves";

export abstract class PolylineEventTimeline<
	E extends EventBase
> extends EventTimeline<E> {
	curves: Curve<E>[] = [];

	abstract eventCanBePlacedOnCurve(event: E, curve: Curve<E> | null): boolean;

	getAddDifs(event: E): CurveDif<E>[] | null {
		if (this.curves.length === 0) {
			if (this.eventCanBePlacedOnCurve(event, null)) {
				return [
					{
						type: "add",
						curvePoints: { start: event, end: null },
						index: 0,
					},
				];
			} else {
				// likely single events can't be placed
				return null;
			}
		}

		for (let i = 0; i < this.curves.length; i++) {
			const curve = this.curves[i];
			const encloses = curve.encloses(event);
			if (encloses === "onEdge") {
				// can't have two events in same location
				return null;
			} else if (encloses === "within") {
				// event sits between existing curve, split the curve
				if (!this.eventCanBePlacedOnCurve(event, curve)) return null;

				return [{ type: "split", curve, at: event, index: i }];
			}
		}
		return null;
	}

	getRemoveDifs(event: E): CurveDif<E>[] | null {
		for (let i = 0; i < this.curves.length; i++) {
			const curve = this.curves[i];
			if (curve.start === event) {
				return this.onRemoveCurve({ type: "remove", curve, index: i });
			}
		}
		return null;
	}

	onRemoveCurve(curveRemoveDif: CurveRemoveDif<E>) {
		// logic for chain reaction when removing events. Can be overrided by subclasses
		return [curveRemoveDif];
	}

	applyDifs(curveDifs: CurveDif<E>[]) {
		for (const dif of curveDifs) {
			switch (dif.type) {
				case "modify": {
					dif.curve.modifyEvent(dif.mod);
					break;
				}
				case "add": {
					const p = dif.curvePoints;
					const newCurve = new Curve(p.start, p.end, this.triggerChange);
					this.curves.splice(dif.index, 0, newCurve);
					break;
				}
				case "remove": {
					dif.curve.removeAllEvents();
					this.curves.splice(dif.index, 1);
					const toLinkRight =
						dif.index < this.curves.length ? this.curves[dif.index] : null;
					const toLinkLeft = dif.index > 0 ? this.curves[dif.index - 1] : null;
					if (toLinkLeft) {
						if (toLinkRight) {
							toLinkLeft.end = toLinkRight.start;
						} else {
							toLinkLeft.end = null;
						}
					}
					break;
				}
				case "split": {
					this.curves.splice(dif.index, 1, ...dif.curve.splitAt(dif.at));
					break;
				}
			}
		}
	}
}
