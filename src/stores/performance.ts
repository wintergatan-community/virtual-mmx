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
	bassStrings,
	DrumTypeTOFIX,
	drumTypes,
	vibraphoneBars,
	ChannelGroupTOFIX,
	channelGroups,
	BassEventSlim,
	DrumsEventSlim,
	VibraphoneEventSlim,
} from "../toFutureSchema";
import {
	EventTimeline,
	mapToEventTimelines,
	mapToDropEventTimelines,
	mapToMuteEventTimelines,
	EventBase,
} from "./eventTimeline";
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
			bass: mapToDropEventTimelines<BassString, BassEventSlim>(bassStrings),
			drums: mapToDropEventTimelines<DrumTypeTOFIX, DrumsEventSlim>(drumTypes),
			vibraphone: mapToDropEventTimelines<
				VibraphoneChannel,
				VibraphoneEventSlim
			>(vibraphoneBars),
		},
		machine: {
			channelMute: mapToMuteEventTimelines<ChannelGroupTOFIX>(
				channelGroups,
				(channelGroup) => (event) => {
					if (!event) return;
					this.program.state.machine.setMuted(channelGroup, event.mute);
				}
			),
		},
		vibraphone: {
			vibratoEnabled: new EventTimeline<
				{
					enableVibrato: boolean;
				} & EventBase
			>(),
			vibratoSpeed: new EventTimeline<{ speed: number } & EventBase>(),
		},
		// hihatMachine: undefined, // TODO not sure what to do with this yet
		hihat: {
			closed: new EventTimeline<{ closed: boolean } & EventBase>(),
		},
		bass: {
			capo: mapToEventTimelines<BassString, { moveCapo: number } & EventBase>(
				bassStrings
			),
		},
	};

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}
