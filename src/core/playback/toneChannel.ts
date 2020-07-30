import { Part } from "tone";
import { EventTimeline } from "../../stores/app";

const partOptions = {
	loop: true,
	loopStart: 0,
	// for some reason this only seems to work with ticks
	loopEnd: 240 * 4 * 16 + "i",
};

export class ToneChannel<EventData> {
	private part = new Part(partOptions);

	constructor(
		timeline: EventTimeline<EventData>,
		triggerStrike: (tick?: number) => void
	) {
		timeline.onAdd((_, tick) => this.part.add(tick + "i"));
		timeline.onRemove((tick) => this.part.remove(tick + "i"));
		this.part.callback = timeline.triggerEvent;
		timeline.addEventListener(triggerStrike);

		this.part.start();
	}
}
