import { EventTimeline } from "../base";
import { Curve, CurvePoints } from "./curves";
import { Signal, signal } from "../../helpers/solid";

export type VmmxEventListener<E extends EventBase> = (
	event?: E,
	time?: number
) => void;
export type VmmxEventChangeListener<E> = (event: E) => void;

export class EventBase {
	id: number;
	tick: Signal<number>;

	static untakenId = 0;

	constructor(data: { tick: number }) {
		this.tick = signal(data.tick);
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

export class JointEventTimeline<EventData extends EventBase> {
	program: EventTimeline<EventData>;
	performance: EventTimeline<EventData>;

	constructor(timelines: {
		program: EventTimeline<EventData>;
		performance: EventTimeline<EventData>;
	}) {
		this.program = timelines.program;
		this.performance = timelines.performance;
	}

	addJointEventListener(l: VmmxEventListener<EventData>) {
		this.program.addEventListener(l);
		this.performance.addEventListener(l);
	}
}

export type EventChange = "add" | "remove" | "modify";
export type ChangeTrigger<E> = (change: EventChange, event: E) => void;
