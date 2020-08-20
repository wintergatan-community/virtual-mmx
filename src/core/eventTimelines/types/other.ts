import { observable } from "mobx";
import { EventTimeline } from "../base";
import { Curve, CurvePoints } from "./curves";

export type VmmxEventListener<E extends EventBase> = (
	event?: E,
	time?: number
) => void;
export type VmmxEventChangeListener<E> = (event: E) => void;

export class EventBase {
	@observable tick: number;
	id: number;

	static untakenId = 0;

	constructor(data: { tick: number }) {
		this.tick = data.tick;
		this.id = EventBase.untakenId++;
	}
}

interface CurveAddDif<E extends EventBase> {
	type: "add";
	curvePoints: CurvePoints<E>;
	index: number;
}
export interface CurveRemoveDif<E extends EventBase> {
	type: "remove";
	curve: Curve<E>;
	index: number;
}
interface CurveModifyDif<E extends EventBase> {
	type: "modify";
	curve: Curve<E>;
	mod: Partial<E>;
}
interface CurveSplitDif<E extends EventBase> {
	type: "split";
	curve: Curve<E>;
	at: E;
	index: number;
}

export interface LoneEventDif<E> {
	type: "add" | "remove";
	event: E;
}

export type TimelineDif<E extends EventBase> = CurveDif<E> | LoneEventDif<E>;

export type CurveDif<E extends EventBase> =
	| CurveModifyDif<E>
	| CurveAddDif<E>
	| CurveRemoveDif<E>
	| CurveSplitDif<E>;

export class JointEventTimeline<E extends EventBase> {
	program: EventTimeline<E>;
	performance: EventTimeline<E>;

	constructor(timelines: {
		program: EventTimeline<E>;
		performance: EventTimeline<E>;
	}) {
		this.program = timelines.program;
		this.performance = timelines.performance;
	}

	addJointEventListener(l: VmmxEventListener<E>) {
		this.program.addEventListener(l);
		this.performance.addEventListener(l);
	}
}

export type EventChange = "add" | "remove" | "modify";
export type ChangeTrigger<E> = (change: EventChange, event: E) => void;
