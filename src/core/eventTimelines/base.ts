import {
	EventBase,
	TimelineDif,
	EventChange,
	VmmxEventChangeListener,
	VmmxEventListener,
} from "./types/other";

export abstract class EventTimeline<E extends EventBase> {
	private eventListeners: VmmxEventListener<E>[] = [];
	private eventTickListeners: Record<number, VmmxEventListener<E>[]> = [];
	private changeEventListeners: Record<
		EventChange,
		VmmxEventChangeListener<E>[]
	> = {
		add: [],
		remove: [],
		modify: [],
	};

	constructor(stateAffectingListener?: VmmxEventListener<E>) {
		stateAffectingListener && this.addEventListener(stateAffectingListener);
	}

	abstract getAddDifs(event: E): TimelineDif<E>[] | null;
	abstract getRemoveDifs(event: E): TimelineDif<E>[] | null;
	abstract applyDifs(difs: TimelineDif<E>[]): void;

	on(change: EventChange, listener: VmmxEventChangeListener<E>) {
		this.changeEventListeners[change].push(listener);
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

	addEventListener(listener: VmmxEventListener<E>, tick?: number) {
		if (tick == undefined) {
			this.eventListeners.push(listener);
		} else {
			this.eventTickListeners[tick] = this.eventTickListeners[tick] ?? [];
			this.eventTickListeners[tick].push(listener);
		}
	}

	protected triggerChange = (change: EventChange, event: E) => {
		this.changeEventListeners[change].forEach((l) => l(event));
	};

	addFromJSONEvent(event: E) {
		const addDifs = this.getAddDifs(event);
		if (!addDifs) throw new Error("Invalid JSON event somewhere in stream");
		this.applyDifs(addDifs);
	}
}
