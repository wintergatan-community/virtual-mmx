import { AppStore } from "./app";
import {
	PerformanceMetadata,
	State,
	TimedEvent,
	BassString,
	VibraphoneChannel,
} from "vmmx-schema";
import { ProgramStore } from "./program";
import {
	BassBakedData,
	bassStrings,
	DrumTypeTOFIX,
	DrumsBakedData,
	drumTypes,
	VibraphoneBakedData,
	vibraphoneBars,
	ChannelGroupTOFIX,
	channelGroups,
} from "../toFutureSchema";
import { EventTimeline, mapToEventTimelines } from "./eventTimeline";
import { Performance } from "vmmx-schema";

export class PerformanceStore implements Performance {
	appStore: AppStore;

	metadata: PerformanceMetadata = {
		title: "Untitled",
		author: "Unknown Author",
	};
	program: ProgramStore = new ProgramStore(this.appStore);
	initialState: State = {} as State;
	events: TimedEvent[] = []; // TODO these last two lines are currently unimplemented garbage

	eventTimelines = {
		performanceDrop: {
			bass: mapToEventTimelines<BassString, BassBakedData>(bassStrings),
			drums: mapToEventTimelines<DrumTypeTOFIX, DrumsBakedData>(drumTypes),
			vibraphone: mapToEventTimelines<VibraphoneChannel, VibraphoneBakedData>(
				vibraphoneBars
			),
		},
		machine: {
			channelMute: mapToEventTimelines<
				ChannelGroupTOFIX,
				{ tick: number; mute: boolean }
			>(channelGroups),
		},
		vibraphone: {
			vibratoEnabled: new EventTimeline<{
				tick: number;
				enableVibrato: boolean;
			}>(),
			vibratoSpeed: new EventTimeline<{ tick: number; speed: number }>(),
		},
		hihatMachine: undefined, // TODO not sure what to do with this yet
		hihat: {
			closed: new EventTimeline<{ tick: number; closed: boolean }>(),
		},
		bass: {
			capo: mapToEventTimelines<BassString, { tick: number; moveCapo: number }>(
				bassStrings
			),
		},
	};

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}
