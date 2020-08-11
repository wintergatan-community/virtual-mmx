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
				// addFunc = () => this.curves.splice(i, 1, ...curve.splitAt(event));
			} // else if (curve.start.tick > event.tick) {
			// 	// curve to place goes right before current curve
			// 	if (!this.eventCanBePlacedOnCurve(event, curve, true)) return null;
			// 	addFunc = () => this.curves.splice(i, 0, new Curve(event, curve.start));
			// 	break;
			// }
		}
		return null;
	}

	getRemoveDifs(event: E): CurveDif<E>[] | null {
		for (let i = 0; i < this.curves.length; i++) {
			const curve = this.curves[i];
			if (curve.start === event) {
				return this.onRemoveCurve({ type: "remove", curve, index: i });

				// return () => {
				// 	this.curves.splice(i, 1);
				// 	this.triggerRemove(curve.start);
				// 	if (i !== 0) {
				// 		this.curves[i - 1].end = curve.end;
				// 	}

				// curve.end && this.triggerRemove(curve.end);
			}
		} // else if (curve.end === event) {
		// 	if (i < this.curves.length - 1) {
		// 		return () => {
		// 			curve.end = this.curves[i + 1].start;
		// 			this.triggerRemove(event);
		// 		};
		// 	} else {
		// 		return () => {
		// 			curve.end = null;
		// 			this.triggerRemove(event);
		// 		};
		// 	}
		// }
		return null;
	}

	onRemoveCurve(curveRemoveDif: CurveRemoveDif<E>) {
		return [curveRemoveDif];
	}

	applyDifs(curveDifs: CurveDif<E>[]) {
		// TODO add event handling
		for (const dif of curveDifs) {
			switch (dif.type) {
				case "modify": {
					break;
				}
				case "add": {
					const p = dif.curvePoints;
					this.curves.splice(dif.index, 0, new Curve(p.start, p.end));
					break;
				}
				case "remove": {
					this.curves.splice(dif.index, 1);
					this.curves[dif.index - 1].end = this.curves[dif.index].start;
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
