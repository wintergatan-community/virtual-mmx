import * as Tone from "tone";
import { Program } from "vmmx-schema";
import { vibraphoneChannelToNote } from "../helpers";

export class VmmxPlayer {
	vibes: Tone.PluckSynth;
	program: Program;
	constructor(prog: Program) {
		// create a new pluck synth that is routed to master
		this.vibes = new Tone.PluckSynth().toDestination();
		this.program = prog;
		this.initializeTransport();
		this.loadProgram();
	}
	createTrigger(note: number | string): (time: number | string) => void {
		return (time): void => {
			console.log(`playing note ${note} at time ${time}`);
			this.vibes.triggerAttack(note, time);
		};
	}
	initializeTransport() {
		Tone.Transport.bpm.value = this.program.state.machine.bpm;
		Tone.Transport.PPQ = this.program.metadata.tpq;
		Tone.Transport.loop = true;
		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = "16m";
	}
	loadProgram(): void {
		this.program.dropEvents.forEach((evt) => {
			if (evt.kind === "vibraphone") {
				// schedule all vibraphone events
				Tone.Transport.schedule(
					this.createTrigger(
						vibraphoneChannelToNote(evt.channel, this.program.state.vibraphone)
					),
					evt.tick + "i"
				);
			}
		});
	}
	public play(): void {
		if (Tone.context.state !== "running") {
			Tone.context.resume();
		}
		Tone.Transport.start();
	}
	public stop(): void {
		Tone.Transport.stop();
		Tone.Transport.position = 0;
	}
}
