import { EventBase, LoneEventDif } from "../types/other";
import { EventTimeline } from "../base";
import { insertInOrder, removeInOrder } from "../../helpers/functions";
import { signal } from "../../helpers/solid";

export class LoneEventTimeline<E extends EventBase> extends EventTimeline<E> {
	events = signal<E[]>([]);

	getAddDifs(event: E): LoneEventDif<E>[] | null {
		if (!this.events().find((e) => e.tick === event.tick)) {
			return [{ type: "add", event }];
		}
		return null;
	}
	getRemoveDifs(event: E): LoneEventDif<E>[] | null {
		if (this.events().find((e) => e.tick === event.tick)) {
			return [{ type: "remove", event }];
		}
		return null;
	}
	applyDifs(difs: LoneEventDif<E>[]): void {
		const events = this.events();
		for (const dif of difs) {
			const { event, type } = dif;
			if (type === "add") {
				insertInOrder(event, (e) => event.tick > e.tick, events);
				this.triggerChange("add", event);
			} else {
				removeInOrder((e) => e.tick === event.tick, events);
				this.triggerChange("remove", event);
			}
		}
		this.events(events);
	}
}
