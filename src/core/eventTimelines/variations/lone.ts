import { EventBase, LoneEventDif } from "../types/other";
import { EventTimeline } from "../base";
import { observable } from "mobx";
import { insertInOrder, removeInOrder } from "../../helpers/functions";

export class LoneEventTimeline<E extends EventBase> extends EventTimeline<E> {
	@observable events: E[] = [];

	getAddDifs(event: E): LoneEventDif<E>[] | null {
		if (!this.events.find((e) => e.tick === event.tick)) {
			return [{ type: "add", event }];
		}
		return null;
	}
	getRemoveDifs(event: E): LoneEventDif<E>[] | null {
		if (this.events.find((e) => e.tick === event.tick)) {
			return [{ type: "remove", event }];
		}
		return null;
	}
	applyDifs(difs: LoneEventDif<E>[]): void {
		for (const dif of difs) {
			const { event, type } = dif;
			if (type === "add") {
				insertInOrder(event, (e) => event.tick > e.tick, this.events);
				this.triggerAdd(event);
			} else {
				removeInOrder((e) => e.tick === event.tick, this.events);
				this.triggerRemove(event);
			}
		}
	}
}
