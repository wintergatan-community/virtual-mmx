import { observable } from "mobx";
import {
	insertInOrder,
	removeInOrder,
	ObjectKey,
	mapArrayToObj,
} from "../core/helpers/functions";
import { MuteEvent } from "../components/performanceEditor/other";

type Listener<EventData> = (event?: EventData, time?: number) => void;

export class EventBase {
	@observable tick: number;
	id: number;

	static untakenId = 0;

	constructor(data: { tick: number }) {
		this.tick = data.tick;
		this.id = EventBase.untakenId++;
	}
}

export class EventTimeline<E extends EventBase> {
	@observable readonly events: E[] = [];
	private eventListeners: Listener<E>[] = [];
	private eventTickListeners: Record<number, Listener<E>[]> = [];
	private addEventListeners: Listener<E>[] = [];
	private removeEventListeners: Listener<E>[] = [];

	constructor(stateAffectingListener?: Listener<E>) {
		if (stateAffectingListener) {
			this.addEventListener(stateAffectingListener);
		}
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

	addFromJSONEvent(event: E) {
		// TODO this is a workaround for now
		this.add(event);
	}

	protected add(event: E) {
		insertInOrder(event, (e) => event.tick > e.tick, this.events);
		this.addEventListeners.forEach((l) => l(event));
	}
	protected remove(tick: number) {
		const event = removeInOrder((event) => event.tick === tick, this.events);
		this.removeEventListeners.forEach((l) => l(event));
	}

	protected move(event: E, newTick: number) {
		const i = this.events.findIndex((e) => e === event);
		this.removeEventListeners.forEach((l) => l(event));
		event.tick = newTick;

		let swapped = false;
		if (i > 0 && newTick < this.events[i - 1].tick) {
			this.events[i] = this.events[i - 1];
			this.events[i - 1] = event;
			swapped = true;
		} else if (
			i < this.events.length - 1 &&
			newTick > this.events[i + 1].tick
		) {
			this.events[i] = this.events[i + 1];
			this.events[i + 1] = event;
			swapped = true;
		}

		this.addEventListeners.forEach((l) => l(event));
		return swapped;
	}
}

export class MuteSegment {
	@observable start: MuteEvent | undefined;
	@observable end: MuteEvent | undefined;
	id: number;

	constructor(start: MuteEvent | undefined, end: MuteEvent | undefined) {
		this.start = start;
		this.end = end;
		this.id = Math.random(); // TODO um no
	}

	encloses(event: MuteEvent) {
		const start = this.start?.tick ?? -Infinity;
		const end = this.end?.tick ?? Infinity;
		return event.tick > start && event.tick < end;
	}
}

// "Make impossible state unrepresentable" TM, mkay then
export class MuteEventTimeline extends EventTimeline<MuteEvent> {
	readonly segments: MuteSegment[] = [];

	addEventSegment(start: MuteEvent, end: MuteEvent) {
		for (const segment of this.segments) {
			if (segment.encloses(start) || segment.encloses(end)) return false;
		}
		// no intersections
		this.insertSegment(new MuteSegment(start, end));
		return true;
	}

	addTerminalEvent(event: MuteEvent) {
		// TODO debug
		if (this.segments.length === 0 && event.mute) {
			this.insertSegment(new MuteSegment(event, undefined));
			return;
		}

		const lastSeg = this.segments[this.segments.length - 1];
		if (event.mute) {
			if (lastSeg.end === undefined || lastSeg.end.tick > event.tick) return;
			this.insertSegment(new MuteSegment(event, undefined));
		} else {
			if (lastSeg.end === undefined) {
				lastSeg.end = event;
			}
		}
	}

	private insertSegment(newSegment: MuteSegment) {
		if (newSegment.start === undefined) {
			this.segments.splice(0, 0, newSegment);
			return;
		} else if (newSegment.end === undefined) {
			this.segments.push(newSegment);
			return;
		}
		const start = newSegment.start.tick;
		insertInOrder(
			newSegment,
			(s) => {
				if (s.start === undefined) return false;
				return start > s.start.tick;
			},
			this.segments
		);
		super.add(newSegment.start);
		super.add(newSegment.end);
	}

	move(event: MuteEvent, newTick: number) {
		return super.move(event, newTick);
	}
}

export class DropEventTimeline<
	EventData extends EventBase
> extends EventTimeline<EventData> {
	add(event: EventData) {
		super.add(event);
	}

	remove(tick: number) {
		super.remove(tick);
	}

	move(event: EventData, newTick: number) {
		return super.move(event, newTick);
	}
}

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

	addJointEventListener(l: Listener<EventData>) {
		this.program.addEventListener(l);
		this.performance.addEventListener(l);
	}
}

// TODO these should all be one, will fix later with something "factory" like
export function mapToEventTimelines<Key extends ObjectKey, E extends EventBase>(
	keys: Key[],
	listenerBuilder?: (key: Key) => Listener<E>
) {
	return mapArrayToObj(keys, (key) => {
		const timeline = new EventTimeline<E>();
		if (listenerBuilder) {
			timeline.addEventListener(listenerBuilder(key));
		}
		return timeline;
	});
}

export function mapToDropEventTimelines<
	Key extends ObjectKey,
	E extends EventBase
>(keys: Key[], listenerBuilder?: (key: Key) => Listener<E>) {
	return mapArrayToObj(keys, (key) => {
		const timeline = new DropEventTimeline<E>();
		if (listenerBuilder) {
			timeline.addEventListener(listenerBuilder(key));
		}
		return timeline;
	});
}

export function mapToMuteEventTimelines<Key extends ObjectKey>(
	keys: Key[],
	listenerBuilder?: (key: Key) => Listener<MuteEvent>
) {
	return mapArrayToObj(keys, (key) => {
		const timeline = new MuteEventTimeline();
		if (listenerBuilder) {
			timeline.addEventListener(listenerBuilder(key));
		}
		return timeline;
	});
}
