import { Program } from "vmmx-schema";
import { MmxParts, MmxSynths } from "./types";
import {
	Transport,
	PluckSynth,
	Sampler,
	context,
	PolySynth,
	Synth,
} from "tone";
import { wheel } from "../../contexts/StoreContext";

function createPartsFromProgram(program: Program): MmxParts {
	const mmxParts = new MmxParts();
	program.dropEvents.forEach((event) => {
		if (event.kind === "vibraphone") {
			mmxParts.vibraphone[event.channel].add(event.tick);
		} else if (event.kind === "bass") {
			mmxParts.bass[event.string].add(event.tick);
		} else if (event.kind === "drum") {
			mmxParts.drums[event.drum].add(event.tick);
		}
	});
	return mmxParts;
}

function createSynths(): MmxSynths<PolySynth, PluckSynth, Sampler> {
	return {
		vibraphone: new PolySynth(Synth).toDestination(),
		bass: new PluckSynth().toDestination(),
		drums: {
			snare: new Sampler().toDestination(),
			bassdrum: new Sampler().toDestination(),
			hihat: new Sampler().toDestination(),
		},
	};
}

export class VmmxPlayer {
	program: Program;
	parts: MmxParts;
	synths: MmxSynths<PolySynth, PluckSynth, Sampler>;
	constructor(program: Program) {
		// create a new pluck synth that is routed to master
		this.program = program;
		this.parts = createPartsFromProgram(this.program);
		this.synths = createSynths();
		this.initializeTransport();
		this.loadTransport();
	}

	initializeTransport() {
		Transport.bpm.value = this.program.state.machine.bpm;
		Transport.PPQ = this.program.metadata.tpq;
	}

	loadTransport(): void {
		// tell the parts to start right away
		this.parts.start(0);
	}

	public play(): void {
		if (context.state !== "running") {
			context.resume();
		}
		Transport.start();
	}

	public stop(): void {
		Transport.stop();
		Transport.position = 0;
	}
}

setInterval(() => {
	wheel.setPlaybackHeadTick(Transport.ticks);
}, 10);
