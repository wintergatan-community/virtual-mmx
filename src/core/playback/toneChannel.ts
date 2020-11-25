import { Part } from "tone";
import {
	EventBase,
	JointEventTimeline,
	VmmxEventListener,
} from "../eventTimelines/types/other";
import { EventTimeline } from "../eventTimelines/base";

const partOptions = {
	loop: true,
	loopStart: 0,
	// for some reason this only seems to work with ticks
	loopEnd: 240 * 4 * 16 + "i",
};

/** Wrapper around ToneJS Parts synced with some EventTimeline */
export class ToneChannel<E extends EventBase> {
	private tonePart = new Part(partOptions);
	// poor implementation until a reliable reactivity mechanism is used
	tickRecord: Record<number, number> = {};

	constructor(
		timeline: EventTimeline<E>,
		onEvent?: VmmxEventListener<E>,
		muted?: () => boolean
	) {
		timeline.on("add", (event) => {
			this.tonePart.add(event.tick() + "i", event);
			this.tickRecord[event.id] = event.tick();
		});
		timeline.on("remove", (event) => {
			this.tonePart.remove(event.tick() + "i");
			delete this.tickRecord[event.id];
		});
		timeline.on("modify", (event) => {
			const oldTick = this.tickRecord[event.id];
			this.tonePart.remove(oldTick + "i");
			this.tonePart.add(event.tick() + "i", event);
			this.tickRecord[event.id] = event.tick();
		});
		this.tonePart.callback = (time, event) => {
			if (muted === undefined || !muted()) {
				timeline.triggerEvent(event, time);
			}
		};
		if (onEvent) {
			timeline.addEventListener(onEvent);
		}

		this.tonePart.start();
	}
}

/** A container for two ToneChannels, one for program and one for performance */
export class JointToneChannel<E extends EventBase> {
	program: ToneChannel<E>;
	performance: ToneChannel<E>;

	constructor(
		timelines: JointEventTimeline<E>,
		onEvent: VmmxEventListener<E>,
		programMuted: () => boolean
	) {
		this.program = new ToneChannel(timelines.program, onEvent, programMuted);
		this.performance = new ToneChannel(
			timelines.performance,
			onEvent,
			programMuted
		);
	}
}
