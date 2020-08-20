import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { DrumsStore } from "../../../stores/drums";
import { Sampler, context } from "tone";
import { JointToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { DrumTypeTOFIX } from "../../../toFutureSchema";
import { DrumsDropE } from "../../eventTimelines/concrete";

export class DrumsInstrument
	implements VmmxInstrument<DrumTypeTOFIX, DrumsDropE> {
	drumsStore: DrumsStore;

	channels: Record<DrumTypeTOFIX, DrumsChannel>;

	constructor(appStore: AppStore, drumsStore: DrumsStore) {
		this.drumsStore = drumsStore;

		this.channels = {
			bassdrum: new DrumsChannel(appStore, "bassdrum"),
			hihat: new DrumsChannel(appStore, "hihat"),
			snare: new DrumsChannel(appStore, "snare"),
			crash: new DrumsChannel(appStore, "crash"),
		};
	}

	onToneLoad() {
		Object.values(this.channels).forEach((c) => {
			c.onToneLoad();
		});
	}
}

class DrumsChannel extends VmmxInstrumentChannel<DrumsDropE> {
	appStore: AppStore;
	toneChannels: JointToneChannel<DrumsDropE>;
	private drumSynth?: Sampler;
	drum: DrumTypeTOFIX;

	constructor(appStore: AppStore, drum: DrumTypeTOFIX) {
		super();
		this.appStore = appStore;
		this.drum = drum;

		const muted = this.appStore.performance.program.state.machine.mute;
		this.toneChannels = new JointToneChannel(
			appStore.jointTimelines.drums[drum],
			this.triggerStrike,
			() => muted[drum]
		);
	}

	triggerStrike = (_?: DrumsDropE, time?: number) => {
		if (this.drumSynth?.loaded) {
			this.drumSynth.triggerAttack("A1", time ?? context.currentTime);
		}
	};

	onToneLoad() {
		this.drumSynth = new Sampler({
			A1: `./samples/drums/${this.drum}.wav`,
		}).toDestination();
	}
}
