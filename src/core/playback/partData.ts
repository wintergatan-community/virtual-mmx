import { Part } from "tone";
import { insertInOrder, removeInOrder } from "../helpers";
import { observable, action } from "mobx";
import { Note } from "vmmx-schema";

export interface PegInPart {
	tick: number;
	note: Note;
}

export default class PartData {
	readonly tonePart: Part;
	@observable readonly tuning: Note;
	@observable readonly pegs: PegInPart[];
	listeners: (() => void)[] = [];

	constructor(tonePart: Part, tuning: Note, trigger: (time: number) => void) {
		this.tonePart = tonePart;
		this.tuning = tuning;
		this.pegs = [];
		this.tonePart.callback = (time) => {
			this.listeners.forEach((l) => l());
			trigger(time);
		};
	}

	@action add(tick: number, note?: Note) {
		note = note ?? this.tuning;
		this.tonePart.add(tick + "i", note);
		insertInOrder({ tick, note }, this.pegs);
	}

	@action remove(tick: number) {
		this.tonePart.remove(tick + "i");
		removeInOrder((p) => p.tick === tick, this.pegs);
	}

	@action runOnNote(callback: () => void) {
		this.listeners.push(callback);
	}
}
