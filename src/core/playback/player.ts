import { Transport, context } from "tone";
import { AppStore } from "../../stores/app";
import { VibraphoneInstrument } from "./instruments/vibraphone";
import { BassInstrument } from "./instruments/bass";
import { DrumsInstrument } from "./instruments/drums";
import { ToneChannel } from "./toneChannel";
import { forEachInNested, values } from "../helpers/functions";
import { EventTimeline } from "../eventTimelines/base";
import { EventBase } from "../eventTimelines/types/other";
import { HiHatMachineSound } from "./sounds/hiHatMachine";
import { MutingLeverSound } from "./sounds/mutingLever";
import { signal } from "../helpers/solid";
import { createEffect } from "solid-js";

export class VmmxPlayer {
	appStore: AppStore;

	running = signal(false);
	currentTick = signal(0);
	toneLoaded = signal(false);

	instruments: {
		vibraphone: VibraphoneInstrument;
		bass: BassInstrument;
		drums: DrumsInstrument;
	};
	sounds: {
		hiHatMachine: HiHatMachineSound;
		mutingLever: MutingLeverSound;
	};
	eventTimelineToneChannels: ToneChannel<EventBase>[] = [];

	constructor(appStore: AppStore) {
		this.appStore = appStore;

		const state = this.program.state;

		this.instruments = {
			vibraphone: new VibraphoneInstrument(appStore, state.vibraphone),
			bass: new BassInstrument(appStore, state.bass),
			drums: new DrumsInstrument(appStore, state.drums),
		};
		this.sounds = {
			hiHatMachine: new HiHatMachineSound(appStore),
			mutingLever: new MutingLeverSound(appStore),
		};

		forEachInNested(
			this.appStore.performance.eventTimelines,
			(maybeTimeline) => maybeTimeline instanceof EventTimeline,
			(timeline) =>
				this.eventTimelineToneChannels.push(
					new ToneChannel(timeline as EventTimeline<EventBase>)
				)
		);

		this.updateCurrentTickLoop();

		// TODO gotta remove with dynamic bpm
		createEffect(() => {
			Transport.bpm.value = this.program.state.machine.bpm();
		});
		createEffect(() => {
			Transport.PPQ = this.program.metadata.tpq;
		});
		// TODO disposers?

		window.addEventListener(
			"mousedown",
			() => {
				values(this.instruments).forEach((i) => i.onToneLoad());
				values(this.sounds).forEach((i) => i.onToneLoad());
				this.toneLoaded(true);
				console.log("Tone Instruments Loaded");
			},
			{ once: true }
		);
	}

	get program() {
		return this.appStore.performance.program;
	}

	updateCurrentTickLoop = () => {
		requestAnimationFrame(this.updateCurrentTickLoop);
		this.currentTick(Transport.ticks);
		// TODO disposer?
	};

	play() {
		this.running(true);
		if (context.state !== "running") {
			context.resume();
		}
		Transport.start();
	}

	pause() {
		this.running(false);
		Transport.pause();
	}

	restart() {
		Transport.position = 0;
	}
}
