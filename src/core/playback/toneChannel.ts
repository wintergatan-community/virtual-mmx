import { Part, Ticks } from "tone";
import { EventTimeline } from "../../stores/app";
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
		triggerStrike: (tick?: number) => void
	) {
		timeline.onAdd((tick) => this.tonePart.add(tick + "i"));
		timeline.onRemove((tick) => this.tonePart.remove(tick + "i"));
		this.tonePart.callback = (time) => {
			timeline.triggerEvent(time);
		};
		timeline.addEventListener(triggerStrike);

		this.tonePart.start();
	}
}
