import * as Tone from "tone";
import { Program } from "vmmx-schema";
import { vibraphoneChannelToNote } from "../helpers";
import { ToneDropEvent } from "./events";
import { observable } from "mobx";

export class VmmxPlayer {
	vibes: Tone.PluckSynth;
	@observable program: Program;
	timeline: Tone.Timeline<ToneDropEvent>;

	constructor() {
		// create a new pluck synth that is routed to master
		this.vibes = new Tone.PluckSynth().toDestination();
		this.program = {} as Program;
		this.timeline = new Tone.Timeline();
		// this.initializeTransport();
		// this.loadProgram();
		// this.loadTransport();
	}

	createTrigger(note: number | string): (time: number | string) => void {
		return (time): void => {
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
				// add the events to the timeline
				this.timeline.add(new ToneDropEvent(evt));
			}
		});
	}

	loadTransport(): void {
		this.timeline.forEach((timelineEvent) => {
			if (timelineEvent.dropEvent.kind === "vibraphone") {
				// schedule all vibraphone events
				// timelineEvent.setId(
				Tone.Transport.schedule(
					this.createTrigger(
						vibraphoneChannelToNote(
							timelineEvent.dropEvent.channel,
							this.program.state.vibraphone
						)
					),
					timelineEvent.time
				);
				// );
			}
		});
	}

	public addDropEvent(dropEvent: ToneDropEvent) {
		this.timeline.add(dropEvent);
	}

	public removeDropEvent(dropEvent: ToneDropEvent) {
		this.timeline.remove(dropEvent);
	}

	public play(): void {
		Tone.Transport.cancel();
		this.loadTransport();
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
