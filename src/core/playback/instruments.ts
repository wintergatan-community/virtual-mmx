import { VibraphoneChannel, BassString, DrumType, Note } from "vmmx-schema";
import { global } from "../../contexts/StoreContext";

// this should probably be part of the schema
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

export const defaultVibraphoneTuning: { [c in VibraphoneChannel]: Note } = {
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
export const defaultBassTuning: { [s in BassString]: Note } = {
	4: "E1",
	3: "A1",
	2: "D2",
	1: "G2",
};

export function createVibraphoneTrigger(note: Note) {
	return (time: number) => {
		const vibraphoneSynth = global.player.synths.vibraphone;
		vibraphoneSynth.triggerAttackRelease(note, 0.2, time);
	};
}
export function createBassTrigger(note: Note) {
	return (time: number) => {
		const bassSynth = global.player.synths.bass;
		bassSynth.triggerAttackRelease(note, 0.2, time);
	};
}

export function vibraphoneChannelToNote(channel: VibraphoneChannel): Note {
	return (
		global.program.state.vibraphone.notes[channel] ||
		defaultVibraphoneTuning[channel]
	);
}
export function bassStringToNote(bassString: BassString): Note {
	return (
		global.program.state.bass.tuning[bassString] ||
		defaultBassTuning[bassString]
	);
	// const noteVal =
	// 	(NoteNames[regularTuning] as number) +
	// 	(this.program.state.bass.capos[bassString] || 0);
	// return NoteNames[noteVal];
}
