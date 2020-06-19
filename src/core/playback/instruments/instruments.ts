import PartData from "../partData";
import { Note, VibraphoneChannel, BassString, DrumType } from "vmmx-schema";

export interface PegChannelData {
	partData: PartData;
	note: Note;
}

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
