import { CoreDropEvent } from "vmmx-schema";
import { observable } from "mobx";
import {
	insertInOrder,
	removeInOrder,
	ObjectKey,
	mapArrayToObj,
} from "../core/helpers/functions";

type Listener<EventData> = (event?: EventData, time?: number) => void;

export class EventTimeline<E extends CoreDropEvent /* extends Event*/> {
	@observable events: E[] = [];
	eventListeners: Listener<E>[] = [];
	eventTickListeners: Record<number, Listener<E>[]> = [];
	addEventListeners: Listener<E>[] = [];
	removeEventListeners: Listener<E>[] = [];

	add(event: E) {
		insertInOrder(event, event.tick, this.events);
		this.addEventListeners.forEach((l) => l(event));
	}
	remove(tick: number) {
		const event = removeInOrder((event) => event.tick === tick, this.events);
		this.removeEventListeners.forEach((l) => l(event));
	}

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
}

export class JointEventTimeline<EventData extends CoreDropEvent> {
	program: EventTimeline<EventData>;
	performance: EventTimeline<EventData>;

	constructor(timelines: {
		program: EventTimeline<EventData>;
		performance: EventTimeline<EventData>;
	}) {
		this.program = timelines.program;
		this.performance = timelines.performance;
	}

	addJointEventListener(l: Listener<EventData>) {
		this.program.addEventListener(l);
		this.performance.addEventListener(l);
	}
}

export function mapToEventTimelines<
	Key extends ObjectKey,
	E extends CoreDropEvent
>(arr: Key[]) {
	return mapArrayToObj(arr, () => new EventTimeline<E>());
}
