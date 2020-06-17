import { Program } from "vmmx-schema";
import { Transport, context } from "tone";
import { wheel } from "../../contexts/StoreContext";
import { observable, action } from "mobx";
import { Vibraphone } from "./instruments/vibraphone";
import { Bass } from "./instruments/bass";
import { Drums } from "./instruments/drums";

// type InstrumentKey = Pick<TickedDropEvent, "kind">["kind"];

export class VMMXPlayer {
	@observable instruments = {
		vibraphone: new Vibraphone(),
		bass: new Bass(),
		drum: new Drums(),
	};
	@observable running = false;

	@action loadProgram(program: Program) {
		program.dropEvents.forEach((event) => {
			const instrument = this.instruments[event.kind];
			instrument.addNoteFromEvent(event as any); // TODO do typescript better
		});

		Transport.bpm.value = program.state.machine.bpm; // TODO move to be reactive
		Transport.PPQ = program.metadata.tpq;
	}

	@action play() {
		this.running = true;
		if (context.state !== "running") {
			context.resume();
		}
		Transport.start();
	}

	@action pause() {
		this.running = false;
		Transport.pause();
	}

	@action restart() {
		Transport.position = 0;
	}
}

setInterval(() => {
	wheel.setPlaybackHeadTick(Transport.ticks);
}, 10);
