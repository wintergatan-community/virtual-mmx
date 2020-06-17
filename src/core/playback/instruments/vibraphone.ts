import { Sampler, Volume, Destination } from "tone";
import {
	VibraphoneChannel,
	Note,
	VibraphoneDropEvent,
	TickedDropEvent,
} from "vmmx-schema";
import { fromEntries } from "../../helpers";
import PartData from "../partData";
import { computed } from "mobx";
import { global } from "../../../contexts/StoreContext";
import { vibraphoneChannels, PegChannelData } from "./instruments";

export class Vibraphone {
	vibraphoneSynth = new Sampler(
		{
			C5: "C5.wav",
		},
		undefined,
		"./samples/vibraphone/"
	);
	static defaultTuning: Record<VibraphoneChannel, Note> = {
		1: "B4",
		2: "C5",
		3: "D5",
		4: "E5",
		5: "F#5",
		6: "G5",
		7: "A5",
		8: "B5",
		9: "C6",
		10: "D6",
		11: "E6",
	};
	constructor() {
		const volume = new Volume(-12);
		this.vibraphoneSynth.chain(volume, Destination);
	}

	channels: Record<VibraphoneChannel, VibraphoneChannelData> = fromEntries(
		vibraphoneChannels.map((channel) => [
			channel,
			new VibraphoneChannelData(channel, this.vibraphoneSynth),
		])
	);

	addNoteFromEvent(event: VibraphoneDropEvent & TickedDropEvent) {
		this.channels[event.channel].partData.add(event.tick);
	}
}
class VibraphoneChannelData implements PegChannelData {
	channelSynth: Sampler;
	partData = new PartData(this.triggerStrike.bind(this));
	channel: VibraphoneChannel;

	constructor(channel: VibraphoneChannel, synth: Sampler) {
		this.channel = channel;
		this.channelSynth = synth;
	}

	@computed get note() {
		return (
			global.program.state.vibraphone.notes[this.channel] ??
			Vibraphone.defaultTuning[this.channel]
		);
	}

	triggerStrike(time?: number) {
		this.channelSynth.triggerAttack(this.note, time);
	}
}
