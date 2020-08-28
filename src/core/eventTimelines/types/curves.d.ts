import { EventBase, ChangeTrigger } from "./other";
export declare type Intersection = "within" | "outside" | "onEdge";
export interface CurvePoints<E extends EventBase> {
    start: E;
    end: E | null;
}
export declare class Curve<E extends EventBase> implements CurvePoints<E> {
    start: E;
    end: E | null;
    id: number;
    static currentId: number;
    private changeTrigger;
    constructor(start: E, end: E | null, changeTrigger: ChangeTrigger<E>);
    encloses(event: E): Intersection;
    splitAt(event: E): Curve<E>[];
    removeAllEvents(): void;
    modifyEvent(dif: Partial<EventBase>): void;
}
