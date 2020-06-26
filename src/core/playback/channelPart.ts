import { Part } from "tone";
import { observable, action } from "mobx";
import { insertInOrder, removeInOrder } from "../helpers";

const partOptions = {
	loop: true,
	loopStart: 0,
	// for some reason this only seems to work with ticks
	loopEnd: 240 * 4 * 16 + "i",
};

export class ChannelPart {
	readonly tonePart = new Part(partOptions);
	@observable readonly pegs: number[];
	listeners: (() => void)[] = [];

	constructor(triggerStrike: (tick: number) => void) {
		this.pegs = [];
		this.tonePart.callback = (tick) => {
			this.listeners.forEach((l) => l());
			triggerStrike(tick);
		};
		this.tonePart.start();
	}

	@action add(tick: number) {
		this.tonePart.add(tick + "i");
		insertInOrder(tick, this.pegs);
	}

	@action remove(tick: number) {
		this.tonePart.remove(tick + "i");
		removeInOrder((searchTick) => searchTick === tick, this.pegs);
	}

	@action runOnNote(callback: () => void) {
		this.listeners.push(callback);
	}
}
