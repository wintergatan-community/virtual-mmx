import { Program, VibraphoneChannel, BassString } from "vmmx-schema";
import { vibraphoneChannelToNote } from "../helpers";
import { MmxParts, MmxSynths } from "./types";
import { Transport, PluckSynth, Sampler, context } from "tone";
import { Note } from "vmmx-schema/note_names";
import { observable } from "mobx";

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

const regularBassTuning: { [s in BassString]: Note } = {
	4: "E1",
	3: "A1",
	2: "D2",
	1: "G2",
};

export class VmmxPlayer {
	program: Program;
	@observable parts: MmxParts;
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
	bassStringToNote(bassString: BassString): string {
		const regularTuning =
			this.program.state.bass.tuning[bassString] ||
			regularBassTuning[bassString];
		return regularTuning;
		// const noteVal =
		// 	(NoteNames[regularTuning] as number) +
		// 	(this.program.state.bass.capos[bassString] || 0);
		// return NoteNames[noteVal];
	}
	createBassTrigger(channel: BassString): (time: number | string) => void {
		return (time): void => {
			this.synths.bass.triggerAttack(this.bassStringToNote(channel), time);
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
		for (const [bassString, part] of Object.entries(this.parts.bass)) {
			part.callback = this.createBassTrigger(
				(bassString as unknown) as BassString
			);
		}
	}

	loadTransport(): void {
		// tell the parts to start right away
		this.parts.start(0);
	}

	public play(): void {
		console.log("sfsf");
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
