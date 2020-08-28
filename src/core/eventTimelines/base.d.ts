import { EventBase, VmmxEventListener, TimelineDif, EventChange, VmmxEventChangeListener } from "./types/other";
export declare abstract class EventTimeline<E extends EventBase> {
    private eventListeners;
    private eventTickListeners;
    private changeEventListeners;
    constructor(stateAffectingListener?: VmmxEventListener<E>);
    abstract getAddDifs(event: E): TimelineDif<E>[] | null;
    abstract getRemoveDifs(event: E): TimelineDif<E>[] | null;
    abstract applyDifs(difs: TimelineDif<E>[]): void;
    on(change: EventChange, listener: VmmxEventChangeListener<E>): void;
    triggerEvent(event?: E, time?: number): void;
    addEventListener(listener: VmmxEventListener<E>, tick?: number): void;
    protected triggerChange: (change: EventChange, event: E) => void;
    addFromJSONEvent(event: E): void;
}
