import { Part } from "tone";
import { EventBase, JointEventTimeline } from "../eventTimelines/types/other";
import { EventTimeline } from "../eventTimelines/base";

const partOptions = {
	loop: true,
	loopStart: 0,
	// for some reason this only seems to work with ticks
	loopEnd: 240 * 4 * 16 + "i",
};

export class ToneChannel<E extends EventBase> {
	private tonePart = new Part(partOptions);

	constructor(
		timeline: EventTimeline<E>,
		triggerStrike?: (time?: number) => void
	) {
		timeline.onAdd((event) => this.tonePart.add(event?.tick + "i", event));
		timeline.onRemove((event) => this.tonePart.remove(event?.tick + "i"));
		this.tonePart.callback = (time, event) => {
			timeline.triggerEvent(event, time);
		};
		if (triggerStrike) {
			timeline.addEventListener((_, time) => triggerStrike(time));
		}

		this.tonePart.start();
	}
}

export class JointToneChannel<E extends EventBase> {
	program: ToneChannel<E>;
	performance: ToneChannel<E>;

	constructor(
		timelines: JointEventTimeline<E>,
		triggerStrike: (time?: number) => void
	) {
		this.program = new ToneChannel(timelines.program, triggerStrike);
		this.performance = new ToneChannel(timelines.performance, triggerStrike);
	}
}
