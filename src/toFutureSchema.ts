import { VibraphoneChannel, BassString, DrumType } from "vmmx-schema";

// TODO this should be part of schema, and it should be VibraphoneBar
export const vibraphoneBars: VibraphoneChannel[] = [
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
export const drumTypes: DrumTypeTOFIX[] = [
	"bassdrum",
	"hihat",
	"snare",
	"crash",
];
export const instruments: InstrumentName[] = ["bass", "drums", "vibraphone"];
export type InstrumentName = "bass" | "drums" | "vibraphone";
export type ChannelGroupTOFIX = DrumTypeTOFIX | "vibraphone" | "bass";
export type DrumTypeTOFIX = DrumType | "crash";
export const channelGroups: ChannelGroupTOFIX[] = [
	"bassdrum",
	"hihat",
	"snare",
	"crash",
	"vibraphone",
	"bass",
];

// these might be replaced with the ones in schema out of the box, but don't contain redundant info
export interface BassBakedData {
	fret?: number;
	tick: number;
}
export interface DrumsBakedData {
	closeHat?: boolean;
	tick: number;
}
export interface VibraphoneBakedData {
	tick: number;
}