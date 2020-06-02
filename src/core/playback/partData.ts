import { Part } from "tone";
import { Note } from "vmmx-schema/note_names";
import { insertInOrder, removeInOrder } from "../helpers";
import { observable, action } from "mobx";

export interface PegInPart {
	tick: number;
	note: Note;
}

export default class PartData {
	readonly tonePart: Part;
	readonly tuning: Note;
	readonly descriptor: string;
	@observable readonly pegs: PegInPart[];
	readonly possibleNotes?: Note[];

	constructor(tonePart: Part, tuning: Note, descriptor: string) {
		this.tonePart = tonePart;
		this.tuning = tuning;
		this.descriptor = descriptor;
		this.pegs = [];
	}

	@action add(tick: number, note?: Note) {
		note = note ?? this.tuning;
		this.tonePart.add(tick + "i", note);
		insertInOrder({ tick, note }, this.pegs);
	}

	@action remove(tick: number) {
		// TODO optimize
		this.tonePart.remove(tick + "i");
		removeInOrder((p) => p.tick === tick, this.pegs);
	}
}
