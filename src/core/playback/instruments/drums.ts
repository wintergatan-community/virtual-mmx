import { DrumDropEvent, TickedDropEvent, DrumType } from "vmmx-schema";
import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { ChannelPart } from "../channelPart";
import { DrumsStore } from "../../../stores/drums";

export class DrumsInstrument
	implements VmmxInstrument<DrumType, DrumDropEvent> {
	drumsStore: DrumsStore;

	channels: Record<DrumType, VmmxInstrumentChannel> = {
		bassdrum: new BassdrumChannel(),
		hihat: new HihatChannel(),
		snare: new SnareChannel(),
	};

	constructor(drumsStore: DrumsStore) {
		this.drumsStore = drumsStore;
	}

	onToneLoad() {
		// TODO
	}

	addNoteFromEvent(event: DrumDropEvent & TickedDropEvent) {
		this.channels[event.drum].channelPart.add(event.tick);
	}
}

class BassdrumChannel implements VmmxInstrumentChannel {
	channelPart = new ChannelPart(this.triggerStrike.bind(this));

	triggerStrike(/*time?: number*/) {
		// this.bassdrumSynth.triggerAttack('SomeNote', time);
		// TODO add bassdrum synth
	}
}

class HihatChannel implements VmmxInstrumentChannel {
	channelPart = new ChannelPart(this.triggerStrike.bind(this));

	triggerStrike(/*time?: number*/) {
		// this.hihatSynth.triggerAttack('SomeNote', time);
		// TODO add hihat synth
	}
}

class SnareChannel implements VmmxInstrumentChannel {
	channelPart = new ChannelPart(this.triggerStrike.bind(this));

	triggerStrike(/*time?: number*/) {
		// this.snareSynth.triggerAttack('SomeNote', time);
		// TODO add snare synth
	}
}
