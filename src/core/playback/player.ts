import { Program, VibraphoneChannel } from "vmmx-schema";
import { vibraphoneChannelToNote } from "../helpers";
import { MmxParts, MmxSynths } from "./types";
import { Transport, PluckSynth, Sampler, context } from "tone";

function createPartsFromProgram(program: Program): MmxParts {
	const mmxParts = new MmxParts();
	program.dropEvents.forEach((event) => {
		if (event.kind === "vibraphone") {
			mmxParts.vibraphone[event.channel].add(event.tick + "i");
		} else if (event.kind === "bass") {
			mmxParts.bass[event.string].add(event.tick + "i");
		} else if (event.kind === "drum") {
			mmxParts.drums[event.drum].add(event.tick + "i");
		}
	});
	return mmxParts;
}

function createSynths(): MmxSynths<PluckSynth, PluckSynth, Sampler> {
	return {
		vibraphone: new PluckSynth().toDestination(),
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
	synths: MmxSynths<PluckSynth, PluckSynth, Sampler>;
	constructor(program: Program) {
		// create a new pluck synth that is routed to master
		this.program = program;
		this.parts = createPartsFromProgram(this.program);
		this.synths = createSynths();
		this.initializeTransport();
		this.loadProgram();
		this.loadTransport();
	}
	createVibraphoneTrigger(
		channel: VibraphoneChannel
	): (time: number | string) => void {
		return (time): void => {
			this.synths.vibraphone.triggerAttack(
				vibraphoneChannelToNote(channel, this.program.state.vibraphone),
				time
			);
		};
	}
	initializeTransport() {
		Transport.bpm.value = this.program.state.machine.bpm;
		Transport.PPQ = this.program.metadata.tpq;
	}
	loadProgram(): void {
		for (const [channel, part] of Object.entries(this.parts.vibraphone)) {
			part.callback = this.createVibraphoneTrigger(
				(channel as unknown) as VibraphoneChannel
			);
		}
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
