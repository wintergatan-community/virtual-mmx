import { Time, TimelineEvent } from "tone";
import { TickedDropEvent } from "vmmx-schema";

export class ToneDropEvent implements TimelineEvent {
	/** The time (in seconds) at which this event occurs. */
	readonly time: number;
	/** The [[TickedDropEvent]] that this event represents. */
	readonly dropEvent: TickedDropEvent;
	/** The ID assigned to this event once it has been scheduled. */
	private _transportId?: number;
	constructor(dropEvent: TickedDropEvent) {
		this.time = Time(dropEvent.tick, "i").toSeconds();
		this.dropEvent = dropEvent;
	}
	setId(newId: number) {
		if (this._transportId != null) {
			throw new Error("setId() can only be called once");
		}
		this._transportId = newId;
	}
	get id(): number | undefined {
		return this._transportId;
	}
}
