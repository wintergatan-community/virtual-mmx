import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { Destination, Volume, Sampler } from "tone";
import { mapToObject } from "../../helpers/functions";
import { computed } from "mobx";
import {
	VibraphoneStore,
	VibraphoneBarStore,
} from "../../../stores/vibraphone";
import { ChannelPart } from "../channelPart";
import {
	VibraphoneDropEvent,
	TickedDropEvent,
	VibraphoneChannel,
} from "vmmx-schema";

export class VibraphoneInstrument
	implements VmmxInstrument<VibraphoneChannel, VibraphoneDropEvent> {
	readonly vibraphoneStore: VibraphoneStore;
	readonly channels: Record<VibraphoneChannel, VibraphoneBarChannel>;

	constructor(vibraphoneStore: VibraphoneStore) {
		this.vibraphoneStore = vibraphoneStore;

		this.channels = mapToObject(
			this.vibraphoneStore.barStores,
			(_, barStore) => new VibraphoneBarChannel(barStore)
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

	addNoteFromEvent(event: VibraphoneDropEvent & TickedDropEvent) {
		this.channels[event.channel].channelPart.add(event.tick);
	}
}

// TODO shema needs to replace use of "channel" and "note"
export class VibraphoneBarChannel implements VmmxInstrumentChannel {
	private barStore: VibraphoneBarStore;
	private channelSynth?: Sampler;
	readonly channelPart = new ChannelPart(this.triggerStrike.bind(this));

	constructor(barStore: VibraphoneBarStore) {
		this.barStore = barStore;
	}

	onToneLoad(synth: Sampler) {
		this.channelSynth = synth;
	}

	@computed get note() {
		return this.barStore.note;
	}

	triggerStrike(time?: number) {
		if (!this.channelSynth?.loaded) return;
		this.channelSynth.triggerAttack(this.note, time);
	}
}
