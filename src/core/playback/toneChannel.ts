import { Part } from "tone";
import { EventTimeline, JointEventTimeline } from "../../stores/app";
import { CoreDropEvent } from "vmmx-schema";

const partOptions = {
	loop: true,
	loopStart: 0,
	// for some reason this only seems to work with ticks
	loopEnd: 240 * 4 * 16 + "i",
};

export class ToneChannel<EventData extends CoreDropEvent> {
	private tonePart = new Part(partOptions);

	constructor(
		timeline: EventTimeline<EventData>,
		triggerStrike: (time?: number) => void
	) {
		timeline.onAdd((event) => this.tonePart.add(event?.tick + "i", event));
		timeline.onRemove((event) => this.tonePart.remove(event?.tick + "i"));
		this.tonePart.callback = (time, event) => {
			timeline.triggerEvent(event, time);
		};
		timeline.addEventListener((_, time) => triggerStrike(time));

		this.tonePart.start();
	}
}

export class JointToneChannel<EventData extends CoreDropEvent> {
	program: ToneChannel<EventData>;
	performance: ToneChannel<EventData>;

	constructor(
		timelines: JointEventTimeline<EventData>,
		triggerStrike: (time?: number) => void
	) {
		this.program = new ToneChannel(timelines.program, triggerStrike);
		this.performance = new ToneChannel(timelines.performance, triggerStrike);
	}
}
