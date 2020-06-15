import { VibraphoneChannel, BassString, DrumType, Note } from "vmmx-schema";
import { global } from "../../contexts/StoreContext";
import PartData from "./partData";
import { Part, NoiseSynth, PolySynth, Synth, Sampler } from "tone";

const partOptions = {
	loop: true,
	loopStart: 0,
	// for some reason this only seems to work with ticks
	loopEnd: 240 * 4 * 16 + "i",
};

export abstract class VMMXInstrument<ChannelType extends string | number> {
	abstract defaultTuning: Record<ChannelType, Note>;
	abstract createTrigger(note: Note): (time: number) => void;
	abstract channelToNote(channel: ChannelType): Note;

	partsSaved: Record<ChannelType, PartData> | undefined;
	get parts() {
		if (!this.partsSaved) {
			const channels = Object.keys(this.defaultTuning) as ChannelType[];
			this.partsSaved = Object.fromEntries(
				channels.map((channel) => {
					const note = this.channelToNote(channel);
					return [
						channel,
						new PartData(new Part(partOptions), note, this.createTrigger(note)),
					];
				})
			) as Record<ChannelType, PartData>;
		}
		return this.partsSaved;
	}
}

export class Vibraphone extends VMMXInstrument<VibraphoneChannel> {
	// vibraphoneSynth = new PolySynth(Synth).toDestination();
	vibraphoneSynth = new Sampler(
		{
			F3: "F3.wav",
			"F#1": "Fs1.wav",
			"F#2": "Fs2.wav",
			"F#3": "Fs3.wav",
			G1: "G1.wav",
			G2: "G2.wav",
			G3: "G3.wav",
			"G#1": "Gs1.wav",
			"G#2": "Gs2.wav",
			"G#3": "Gs3.wav",
			A1: "A1.wav",
			A2: "A2.wav",
			A3: "A3.wav",
			"A#1": "As1.wav",
			"A#2": "As2.wav",
			"A#3": "As3.wav",
			B1: "B1.wav",
			B2: "B2.wav",
			B3: "B3.wav",
			C2: "C2.wav",
			C3: "C3.wav",
			C4: "C4.wav",
			"C#2": "Cs2.wav",
			"C#3": "Cs3.wav",
			"C#4": "Cs4.wav",
			D1: "D1.wav",
			D2: "D2.wav",
			D3: "D3.wav",
			D4: "D4.wav",
			"D#1": "Ds1.wav",
			"D#2": "Ds2.wav",
			"D#3": "Ds3.wav",
			E1: "E1.wav",
			E2: "E2.wav",
			E3: "E3.wav",
			F1: "F1.wav",
			F2: "F2.wav",
		},
		undefined,
		"./samples/vibraphone/"
	).toDestination();
	defaultTuning: Record<VibraphoneChannel, Note> = {
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
	createTrigger(note: Note) {
		return (time: number) => {
			this.vibraphoneSynth.triggerAttack(note, time);
		};
	}
	channelToNote(channel: VibraphoneChannel) {
		return (
			global.program.state.vibraphone.notes[channel] ||
			this.defaultTuning[channel]
		);
	}
}

export class Bass extends VMMXInstrument<BassString> {
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
	).toMaster();
	defaultTuning: Record<BassString, Note> = {
		4: "E2",
		3: "A2",
		2: "D3",
		1: "G3",
	};
	createTrigger(note: Note) {
		// const noteVal =
		// 	(NoteNames[regularTuning] as number) +
		// 	(this.program.state.bass.capos[bassString] || 0);
		// return NoteNames[noteVal];
		return (time: number) => {
			this.bassSynth.triggerAttack(note, time);
		};
	}
	channelToNote(bassString: BassString): Note {
		return (
			global.program.state.bass.tuning[bassString] ||
			this.defaultTuning[bassString]
		);
	}
}

export class Drums extends VMMXInstrument<DrumType> {
	snareSynth = new NoiseSynth({
		envelope: {
			sustain: 0.01,
		},
	}).toDestination();
	defaultTuning: Record<DrumType, Note> = {
		bassdrum: "A1",
		hihat: "A1",
		snare: "A1",
	};
	createTrigger(note: Note) {
		return (time: number) => {
			this.snareSynth.triggerAttackRelease(note, 0.2, time);
		};
	}
	channelToNote(): Note {
		return "A1";
	}
}
