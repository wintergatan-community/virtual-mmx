import { Time, TimelineEvent } from "tone";
import { TickedDropEvent } from "vmmx-schema";

export class ToneDropEvent implements TimelineEvent {
	/** The time (in seconds) at which this event occurs. */
	readonly time: number;
	/** The [[TickedDropEvent]] that this event represents. */
	readonly dropEvent: TickedDropEvent;
	/** The ID assigned to this event once it has been scheduled. */
	readonly id: number;

	private static idCount = 0;
	constructor(dropEvent: TickedDropEvent) {
		this.time = Time(dropEvent.tick, "i").toSeconds();
		console.log(this.time);
		this.dropEvent = dropEvent;
		this.id = ToneDropEvent.idCount++;
	}
}
