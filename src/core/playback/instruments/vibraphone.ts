import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { Destination, Volume, Sampler, context } from "tone";
import { mapToObject } from "../../helpers/functions";
import { computed } from "mobx";
import {
	VibraphoneStore,
	VibraphoneBarStore,
} from "../../../stores/vibraphone";
import { VibraphoneChannel } from "vmmx-schema";
import { JointToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { VibraphoneDropE } from "../../eventTimelines/concrete";

export class VibraphoneInstrument implements VmmxInstrument<VibraphoneChannel> {
	readonly vibraphoneStore: VibraphoneStore;
	readonly channels: Record<VibraphoneChannel, VibraphoneBarChannel>;

	constructor(appStore: AppStore, vibraphoneStore: VibraphoneStore) {
		this.vibraphoneStore = vibraphoneStore;

		this.channels = mapToObject(
			this.vibraphoneStore.barStores,
			(_, barStore) => new VibraphoneBarChannel(appStore, barStore)
		);
	}

	onToneLoad() {
		const vibraphoneSynth = new Sampler(
			{
				C5: "C5.wav",
			},
			undefined,
			"./samples/vibraphone/"
		);

		const volume = new Volume(-12);
		vibraphoneSynth.chain(volume, Destination);

		Object.values(this.channels).forEach((c) => c.onToneLoad(vibraphoneSynth));
	}
}

// TODO shema needs to replace use of "channel" and "note"
export class VibraphoneBarChannel implements VmmxInstrumentChannel {
	private appStore: AppStore;
	private barStore: VibraphoneBarStore;
	private channelSynth?: Sampler;
	readonly toneChannels: JointToneChannel<VibraphoneDropE>;

	constructor(appStore: AppStore, barStore: VibraphoneBarStore) {
		this.appStore = appStore;
		this.barStore = barStore;

		this.toneChannels = new JointToneChannel(
			appStore.jointTimelines.vibraphone[barStore.bar],
			this.triggerStrike.bind(this)
		);
	}

	onToneLoad(synth: Sampler) {
		this.channelSynth = synth;
	}

	@computed get note() {
		return this.barStore.note;
	}

	triggerStrike(time?: number) {
		if (
			this.channelSynth?.loaded &&
			!this.appStore.performance.program.state.machine.mute.vibraphone
		) {
			this.channelSynth.triggerAttack(this.note, time ?? context.currentTime);
		}
	}
}
