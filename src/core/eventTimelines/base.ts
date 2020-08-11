import { EventBase, Listener, TimelineDif } from "./types/other";

export abstract class EventTimeline<E extends EventBase> {
	private eventListeners: Listener<E>[] = [];
	private eventTickListeners: Record<number, Listener<E>[]> = [];
	private addEventListeners: Listener<E>[] = [];
	private removeEventListeners: Listener<E>[] = [];

	constructor(stateAffectingListener?: Listener<E>) {
		stateAffectingListener && this.addEventListener(stateAffectingListener);
	}

	abstract getAddDifs(event: E): TimelineDif<E>[] | null;
	abstract getRemoveDifs(event: E): TimelineDif<E>[] | null;
	abstract applyDifs(difs: TimelineDif<E>[]): void;

	onAdd(listener: Listener<E>) {
		this.addEventListeners.push(listener);
	}
	onRemove(listener: Listener<E>) {
		this.removeEventListeners.push(listener);
	}

	triggerEvent(event?: E, time?: number) {
		if (event === undefined) {
			this.eventListeners.forEach((l) => l(undefined, time));
		} else {
			const tick = event.tick;
			this.eventListeners.forEach((l) => l(event, time));
			if (this.eventTickListeners[tick]) {
				this.eventTickListeners[tick].forEach((l) => l(event, time));
			}
		}
	}

	addEventListener(listener: Listener<E>, tick?: number) {
		if (tick == undefined) {
			this.eventListeners.push(listener);
		} else {
			this.eventTickListeners[tick] = this.eventTickListeners[tick] ?? [];
			this.eventTickListeners[tick].push(listener);
		}
	}

	protected triggerAdd(event: E) {
		this.addEventListeners.forEach((l) => l(event));
	}
	protected triggerRemove(event: E) {
		this.removeEventListeners.forEach((l) => l(event));
	}

	addFromJSONEvent(event: E) {
		const addDifs = this.getAddDifs(event);
		if (!addDifs) throw new Error("Invalid JSON event somewhere in stream");
		this.applyDifs(addDifs);
	}
}
