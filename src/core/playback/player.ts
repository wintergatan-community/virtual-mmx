import { Program, TickedDropEvent } from "vmmx-schema";
import { Transport, context } from "tone";
import { wheel } from "../../contexts/StoreContext";
import { observable, action } from "mobx";
import { Vibraphone, Bass, Drums, VMMXInstrument } from "./instruments";
import PartData from "./partData";

type InstrumentKey = Pick<TickedDropEvent, "kind">["kind"];

export class VMMXPlayer {
	@observable instruments: Record<InstrumentKey, VMMXInstrument<any>> = {
		vibraphone: new Vibraphone(),
		bass: new Bass(),
		drum: new Drums(),
	};
	@observable running = false;

	constructor() {
		this.initializeTransport();
	}

	initializeTransport() {
		// tell the parts to start right away
		this.forEachPart((part) => part.tonePart.start());
	}

	@action loadProgram(program: Program) {
		program.dropEvents.forEach((event) => {
			const instrument = this.instruments[event.kind];
			const key = {
				vibraphone: "channel",
				bass: "string",
				drum: "drum",
			}[event.kind];

			const part = instrument.parts[event[key as keyof TickedDropEvent]];
			part.add(event.tick);
		});

		Transport.bpm.value = program.state.machine.bpm;
		Transport.PPQ = program.metadata.tpq;

		// if (event.kind === "vibraphone") {
		// 	this.allParts.vibraphone[event.channel].add(event.tick);
		// } else if (event.kind === "bass") {
		// 	this.allParts.bass[event.string].add(event.tick);
		// } else if (event.kind === "drum") {
		// 	this.allParts.drums[event.drum].add(event.tick);
		// }
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

	forEachPart(func: (p: PartData) => void) {
		for (const i of Object.values(this.instruments)) {
			for (const p of Object.values(i.parts)) {
				func(p);
			}
		}
		// const entries = Object.entries(this.instruments);
		// return Object.fromEntries(
		// 	entries.map(([key, instrument]) => [key, instrument.parts])
		// ) as Record<InstrumentKey, Record<any, PartData>>;
	}
}

setInterval(() => {
	wheel.setPlaybackHeadTick(Transport.ticks);
}, 10);
