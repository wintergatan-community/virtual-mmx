import { VibraphoneChannel, BassString, DrumType, Note } from "vmmx-schema";
import { global } from "../../contexts/StoreContext";
import PartData from "./partData";
import { Part, NoiseSynth, PolySynth, Synth, PluckSynth } from "tone";

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
	vibraphoneSynth = new PolySynth(Synth).toDestination();
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
			this.vibraphoneSynth.triggerAttackRelease(note, 0.2, time);
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
	bassSynth = new PluckSynth().toDestination();
	defaultTuning: Record<BassString, Note> = {
		4: "E1",
		3: "A1",
		2: "D2",
		1: "G2",
	};
	createTrigger(note: Note) {
		return (time: number) => {
			this.bassSynth.triggerAttackRelease(note, 0.2, time);
		};
	}
	channelToNote(bassString: BassString): Note {
		return (
			global.program.state.bass.tuning[bassString] ||
			this.defaultTuning[bassString]
		);
		// const noteVal =
		// 	(NoteNames[regularTuning] as number) +
		// 	(this.program.state.bass.capos[bassString] || 0);
		// return NoteNames[noteVal];
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
