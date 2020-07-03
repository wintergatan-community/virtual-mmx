import { DrumDropEvent, TickedDropEvent, DrumType } from "vmmx-schema";
import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { ChannelPart } from "../channelPart";
import { DrumsStore } from "../../../stores/drums";
import { Sampler } from "tone";

type DrumTypeTOFIX = DrumType | "crash";

export class DrumsInstrument
	implements VmmxInstrument<DrumTypeTOFIX, DrumDropEvent> {
	drumsStore: DrumsStore;

	channels: Record<DrumTypeTOFIX, DrumsChannel> = {
		bassdrum: new DrumsChannel("bassdrum"),
		hihat: new DrumsChannel("hihat"),
		snare: new DrumsChannel("snare"),
		crash: new DrumsChannel("crash"),
	};

	constructor(drumsStore: DrumsStore) {
		this.drumsStore = drumsStore;
	}

	onToneLoad() {
		Object.values(this.channels).forEach((c) => {
			c.onToneLoad();
		});
	}

	addNoteFromEvent(event: DrumDropEvent & TickedDropEvent) {
		this.channels[event.drum].channelPart.add(event.tick);
	}
}

class DrumsChannel implements VmmxInstrumentChannel {
	channelPart = new ChannelPart(this.triggerStrike.bind(this));
	private drumSynth?: Sampler;
	drum: DrumTypeTOFIX;

	constructor(drum: DrumTypeTOFIX) {
		this.drum = drum;
	}

	triggerStrike(time?: number) {
		if (!this.drumSynth?.loaded) return;
		this.drumSynth.triggerAttack("A1", time);
	}

	onToneLoad() {
		this.drumSynth = new Sampler({
			A1: `./samples/drums/${this.drum}.wav`,
		}).toDestination();
	}

	get channelColor() {
		return "rgb(60, 60, 60)";
	}
}
