import { EventTimeline } from "../base";
import { EventBase, CurveDif, CurveRemoveDif } from "../types/other";
import { Curve } from "../types/curves";
export declare abstract class PolylineEventTimeline<E extends EventBase> extends EventTimeline<E> {
    curves: Curve<E>[];
    abstract eventCanBePlacedOnCurve(event: E, curve: Curve<E> | null): boolean;
    getAddDifs(event: E): CurveDif<E>[] | null;
    getRemoveDifs(event: E): CurveDif<E>[] | null;
    onRemoveCurve(curveRemoveDif: CurveRemoveDif<E>): CurveRemoveDif<E>[];
    applyDifs(curveDifs: CurveDif<E>[]): void;
}
