import { BassString } from "vmmx-schema";
import { Sampler, Volume, Destination, PitchShift, context } from "tone";
import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { mapToObject } from "../../helpers/functions";
import { BassStore, BassStringStore } from "../../../stores/bass";
import { JointToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { BassDropE } from "../../eventTimelines/concrete";
import { createEffect, createRoot } from "solid-js";

// Represents the bass instrument
export class BassInstrument implements VmmxInstrument<BassString, BassDropE> {
	private bassStore: BassStore;
	readonly channels: Record<BassString, BassStringChannel>;

	constructor(appStore: AppStore, bassStore: BassStore) {
		this.bassStore = bassStore;

		this.channels = mapToObject(
			this.bassStore.stringStores,
			(_, stringStore) => new BassStringChannel(appStore, stringStore)
		);
	}

	onToneLoad() {
		Object.values(this.channels).forEach((c) => c.onToneLoad());
	}
}

export class BassStringChannel extends VmmxInstrumentChannel<BassDropE> {
	private appStore: AppStore;
	private stringStore: BassStringStore;
	private bassSynth?: Sampler;
	readonly toneChannels: JointToneChannel<BassDropE>;

	constructor(appStore: AppStore, stringStore: BassStringStore) {
		super();
		this.appStore = appStore;
		this.stringStore = stringStore;

		const muted = this.appStore.performance.program.state.machine.mute;
		this.toneChannels = new JointToneChannel(
			appStore.jointTimelines.bass[stringStore.string],
			this.triggerStrike,
			() => muted.bass() ?? false
		);
	}

	onToneLoad() {
		this.bassSynth = new Sampler(
			{
				"A#2": "As2.wav",
				"A#3": "As3.wav",
				"A#4": "As4.wav",
				"A#5": "As5.wav",
				"C#2": "Cs2.wav",
				"C#3": "Cs3.wav",
				"C#4": "Cs4.wav",
				"C#5": "Cs5.wav",
				E2: "E2.wav",
				E3: "E3.wav",
				E4: "E4.wav",
				E5: "E5.wav",
				G2: "G2.wav",
				G3: "G3.wav",
				G4: "G4.wav",
				G5: "G5.wav",
			},
			undefined,
			"./samples/bass/"
		);

		const volume = new Volume(-10);
		const pitchShifter = new PitchShift();
		createRoot(() => {
			createEffect(() => {
				pitchShifter.pitch = this.stringStore.capo ?? 0;
			});
		});
		this.bassSynth.chain(volume, pitchShifter, Destination);
	}

	get note() {
		return this.stringStore.tuning;
	}

	triggerStrike = (_?: BassDropE, time?: number) => {
		if (this.bassSynth?.loaded) {
			this.bassSynth.triggerAttack(this.note, time ?? context.currentTime);
		}
	};
}
