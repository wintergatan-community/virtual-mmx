import { AppStore } from "./app";
import { PerformanceMetadata, State, TimedEvent } from "vmmx-schema";
import { ProgramStore } from "./program";
import {
	bassStrings,
	DrumTypeTOFIX,
	drumTypes,
	vibraphoneBars,
	channelGroups,
} from "../toFutureSchema";
import { Performance } from "vmmx-schema";
import { mapArrayToObj } from "../core/helpers/functions";
import {
	MuteEventTimeline,
	BassDropEventTimeline,
	DrumsDropEventTimeline,
	HiHatDropEventTimeline,
	DropEventTimeline,
	VibraphoneDropEventTimeline,
	VibraphoneVibratoEventTimeline,
	CapoEventTimeline,
	HiHatMachineModeEventTimeline,
} from "../core/eventTimelines/concrete";

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
			bass: mapArrayToObj(bassStrings, () => new BassDropEventTimeline()),
			drums: mapArrayToObj<DrumTypeTOFIX, DrumsDropEventTimeline>(
				drumTypes,
				(drumType) =>
					drumType === "hihat"
						? new HiHatDropEventTimeline()
						: new DropEventTimeline()
			), // TODO might want separate drum events
			vibraphone: mapArrayToObj(
				vibraphoneBars,
				() => new VibraphoneDropEventTimeline()
			),
		},
		machine: {
			channelMute: mapArrayToObj(
				channelGroups,
				(channelGroup) =>
					new MuteEventTimeline((event) => {
						if (!event) return;
						this.program.state.machine.setMuted(channelGroup, event.mute);
					})
			),
		},
		vibraphone: {
			vibrato: new VibraphoneVibratoEventTimeline(),
		},
		// hihatMachine: undefined, // TODO not sure what to do with this yet
		hihat: {
			hatOpen: new HiHatDropEventTimeline(),
		},
		bass: {
			capo: mapArrayToObj(
				bassStrings,
				(bassString) =>
					new CapoEventTimeline((event) => {
						if (!event || !event.moveFret) return;
						this.program.state.bass.stringStores[bassString].moveCapo(
							event.moveFret
						);
					})
			),
		},
		hiHatMachine: {
			mode: new HiHatMachineModeEventTimeline(),
		},
	};

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}
