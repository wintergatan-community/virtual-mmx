import { EventTimeline } from "../base";
import { Curve, CurvePoints } from "./curves";
import { Signal } from "../../helpers/solid";
export declare type VmmxEventListener<E extends EventBase> = (event?: E, time?: number) => void;
export declare type VmmxEventChangeListener<E> = (event: E) => void;
export declare class EventBase {
    id: number;
    tick: Signal<number>;
    static untakenId: number;
    constructor(data: {
        tick: number;
    });
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
export declare type TimelineDif<E extends EventBase> = CurveDif<E> | LoneEventDif<E>;
export declare type CurveDif<E extends EventBase> = CurveModifyDif<E> | CurveAddDif<E> | CurveRemoveDif<E> | CurveSplitDif<E>;
export declare class JointEventTimeline<EventData extends EventBase> {
    program: EventTimeline<EventData>;
    performance: EventTimeline<EventData>;
    constructor(timelines: {
        program: EventTimeline<EventData>;
        performance: EventTimeline<EventData>;
    });
    addJointEventListener(l: VmmxEventListener<EventData>): void;
}
export declare type EventChange = "add" | "remove" | "modify";
export declare type ChangeTrigger<E> = (change: EventChange, event: E) => void;
export {};
