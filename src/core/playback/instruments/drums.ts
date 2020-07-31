import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { DrumsStore } from "../../../stores/drums";
import { Sampler, context } from "tone";
import { JointToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { DrumTypeTOFIX, DrumsBakedData } from "../../../toFutureSchema";

export class DrumsInstrument implements VmmxInstrument<DrumTypeTOFIX> {
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

class DrumsChannel implements VmmxInstrumentChannel {
	appStore: AppStore;
	toneChannels: JointToneChannel<DrumsBakedData>;
	private drumSynth?: Sampler;
	drum: DrumTypeTOFIX;

	constructor(appStore: AppStore, drum: DrumTypeTOFIX) {
		this.appStore = appStore;
		this.drum = drum;

		this.toneChannels = new JointToneChannel(
			appStore.jointTimelines.drums[drum],
			this.triggerStrike.bind(this)
		);
	}

	triggerStrike(time?: number) {
		if (
			this.drumSynth?.loaded &&
			!this.appStore.performance.program.state.machine.mute[this.drum]
		) {
			this.drumSynth.triggerAttack("A1", time ?? context.currentTime);
		}
	}

	onToneLoad() {
		this.drumSynth = new Sampler({
			A1: `./samples/drums/${this.drum}.wav`,
		}).toDestination();
	}
}
