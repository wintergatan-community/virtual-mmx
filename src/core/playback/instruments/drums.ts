import { DrumDropEvent, TickedDropEvent, DrumType } from "vmmx-schema";
import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { DrumsStore } from "../../../stores/drums";
import { Sampler, context, Transport } from "tone";
import { ToneChannel } from "../toneChannel";
import { AppStore, DrumsBakedData } from "../../../stores/app";

export type DrumTypeTOFIX = DrumType | "crash";

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
	performanceChannel: ToneChannel<DrumsBakedData>;
	programChannel: ToneChannel<DrumsBakedData>;
	private drumSynth?: Sampler;
	drum: DrumTypeTOFIX;

	constructor(appStore: AppStore, drum: DrumTypeTOFIX) {
		this.drum = drum;

		const p = appStore.performance;
		this.performanceChannel = new ToneChannel(
			p.eventTimelines.performanceDrop.drums[this.drum],
			this.triggerStrike.bind(this)
		);
		this.programChannel = new ToneChannel(
			p.program.dropEventTimelines.drums[this.drum],
			this.triggerStrike.bind(this)
		);
	}

	triggerStrike(time?: number) {
		if (!this.drumSynth?.loaded) return;
		this.drumSynth.triggerAttack("A1", time ?? context.currentTime);
	}

	onToneLoad() {
		this.drumSynth = new Sampler({
			A1: `./samples/drums/${this.drum}.wav`,
		}).toDestination();
	}
}
