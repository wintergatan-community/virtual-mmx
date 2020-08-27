import { EventBase, ChangeTrigger } from "./other";

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
	private changeTrigger: ChangeTrigger<E>;

	constructor(start: E, end: E | null, changeTrigger: ChangeTrigger<E>) {
		this.start = start;
		this.end = end;
		this.id = Curve.currentId;
		Curve.currentId++;

		this.changeTrigger = changeTrigger;
		changeTrigger("add", start);
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
		return [
			new Curve(this.start, event, this.changeTrigger),
			new Curve(event, this.end, this.changeTrigger),
		];
	}

	removeAllEvents() {
		// TODO this is gonna get a lot longer
		this.changeTrigger("remove", this.start);
	}

	modifyEvent(dif: Partial<EventBase>) {
		// TODO dont like EventBase there ^
		Object.assign(this.start, dif);
		this.changeTrigger("modify", this.start);
	}
}
