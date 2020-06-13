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

	constructor(tonePart: Part, tuning: Note, trigger: (time: number) => void) {
		this.tonePart = tonePart;
		this.tuning = tuning;
		this.pegs = [];
		this.tonePart.callback = trigger;
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
}
