import { EventBase } from "./other";

// export type Curve<E extends EventBase> =
// 	| LinearCurve<E>
// 	| InfiniteTerminalCurve<E>;

// interface CurveBase<E extends EventBase> {
// 	encloses(event: E): Intersection;
// 	splitAt(event: E): Curve<E>[];
// }

// export class InfiniteTerminalCurve<E extends EventBase>
// 	implements CurveBase<E> {
// 	start: E | null;
// 	end: E | null;

// 	constructor(start: E | null, end: E | null) {
// 		if (start && end)
// 			throw new Error(
// 				"An InfiniteTerminalCurve cannot have two valid terminal points"
// 			);
// 		this.start = start;
// 		this.end = end;
// 	}

// 	encloses(event: E): Intersection {
// 		return "within";
// 		// TODO
// 	}
// 	splitAt(event: E): Curve<E>[] {
// 		const first = this.start
// 			? new LinearCurve(this.start, event)
// 			: new InfiniteTerminalCurve(null, event);
// 		const second = this.end
// 			? new LinearCurve(event, this.end)
// 			: new InfiniteTerminalCurve(event, null);
// 		return [first, second];
// 	}
// }

// export class LinearCurve<E extends EventBase> implements CurveBase<E> {
// 	start: E;
// 	end: E;
// 	between: E[] = [];

// 	constructor(start: E, end: E) {
// 		this.start = start;
// 		this.end = end;
// 	}

// 	encloses(event: E): Intersection {
// 		return "within";
// 		// TODO
// 	}
// 	splitAt(event: E) {
// 		const first = new LinearCurve(this.start, event);
// 		const second = new LinearCurve(event, this.end);
// 		return [first, second];
// 	}
// }

export type Intersection = "within" | "outside" | "onEdge";

export interface CurvePoints<E extends EventBase> {
	start: E;
	end: E | null;
}

export class Curve<E extends EventBase> implements CurvePoints<E> {
	start: E;
	end: E | null;
	id: number;
	static currentId = 0;

	constructor(start: E, end: E | null) {
		this.start = start;
		this.end = end;
		this.id = Curve.currentId;
		this.id++;
	}

	encloses(event: E): Intersection {
		const endTick = this.end ? this.end.tick : Infinity;
		const startTick = this.start.tick;
		if (event.tick < startTick || event.tick > endTick) {
			return "outside";
		} else if (event.tick === startTick || event.tick === endTick) {
			return "onEdge";
		} else {
			return "within";
		}
	}
	splitAt(event: E): Curve<E>[] {
		return [new Curve(this.start, event), new Curve(event, this.end)];
	}
}
