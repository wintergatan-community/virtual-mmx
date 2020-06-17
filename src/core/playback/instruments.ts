import {
	VibraphoneChannel,
	BassString,
	DrumType,
	Note,
	VibraphoneDropEvent,
	TickedDropEvent,
	BassDropEvent,
	DrumDropEvent,
} from "vmmx-schema";
import { global } from "../../contexts/StoreContext";
import PartData from "./partData";
import { Sampler, Volume, Destination } from "tone";
import { fromEntries } from "../helpers";
import { computed } from "mobx";

export interface PegChannelData {
	partData: PartData;
	note: Note;
}

export class Bass {
	static defaultTuning: Record<BassString, Note> = {
		4: "E2",
		3: "A2",
		2: "D3",
		1: "G3",
	};
	strings: Record<BassString, BassStringData> = fromEntries(
		bassStrings.map((string) => [string, new BassStringData(string)])
	);

	addNoteFromEvent(event: BassDropEvent & TickedDropEvent) {
		this.strings[event.string].partData.add(event.tick);
	}
}
class BassStringData implements PegChannelData {
	bassSynth = new Sampler(
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
	partData = new PartData(this.triggerStrike.bind(this));
	string: BassString;

	constructor(string: BassString) {
		this.string = string;
		const volume = new Volume(-10);
		this.bassSynth.chain(volume, Destination);
	}

	toNote(string: BassString) {
		return (
			global.program.state.bass.tuning[string] ?? Bass.defaultTuning[string]
		);
	}

	@computed get note() {
		return this.toNote(this.string);
	}

	triggerStrike(time?: number) {
		this.bassSynth.triggerAttack(this.toNote(this.string), time);
	}

	moveCapo(fret: number) {}
	pushFret(fret: number) {}
}

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

	toNote(channel: VibraphoneChannel) {
		return (
			global.program.state.vibraphone.notes[channel] ??
			Vibraphone.defaultTuning[channel]
		);
	}

	@computed get note() {
		return this.toNote(this.channel);
	}

	triggerStrike(time?: number) {
		this.channelSynth.triggerAttack(this.toNote(this.channel), time);
	}
}

export class Drums {
	// drums = {
	// 	bassdrum: new BassDrumData,
	// 	hihat: new HiHatData(),
	// 	snare: new SnareData()
	// };

	addNoteFromEvent(event: DrumDropEvent & TickedDropEvent) {
		// this.channels[event.channel].partData.add(event.tick)
	}
}
// class SnareData {
// 	snareSynth = new Buffer(
// 		{
// 			C5: "C5.wav",
// 		},
// 		undefined,
// 		"./samples/drum/"
// 	);
// 	partData: PartData;
// 	triggerStrike(tick?: number): void;
// }
// class HiHatData {
// 	hiHatSynth: any;
// 	partData: PartData;
// 	triggerStrike(tick?: number): void;
// 	setHatOpen(amount: number): void;
// }
// class BassDrumData {
// 	bassDrumSynth: any;
// 	partData: PartData;
// 	triggerStrike(tick?: number): void;
// }

export const vibraphoneChannels: VibraphoneChannel[] = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
];
export const bassStrings: BassString[] = [1, 2, 3, 4];
export const drumTypes: DrumType[] = ["bassdrum", "hihat", "snare"];
