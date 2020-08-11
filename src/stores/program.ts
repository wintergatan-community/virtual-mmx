import {
	Program,
	BassDropEvent,
	DrumDropEvent,
	VibraphoneDropEvent,
	ProgramMetadata,
	HihatEvent,
} from "vmmx-schema";
import { AppStore } from "./app";
import {
	bassStrings,
	drumTypes,
	vibraphoneBars,
	DrumTypeTOFIX,
} from "../toFutureSchema";
import { observable } from "mobx";
import { StateStore } from "./state";
import { mapArrayToObj } from "../core/helpers/functions";
import {
	BassDropEventTimeline,
	HiHatDropEventTimeline,
	VibraphoneDropEventTimeline,
	BassDropE,
	VibraphoneDropE,
	DropEventTimeline,
	DrumsDropEventTimeline,
	HiHatDropE,
	DropE,
} from "../core/eventTimelines/concrete";

export class ProgramStore implements Program {
	appStore: AppStore;

	metadata = new ProgramMetadataStore(this.appStore);
	state = new StateStore(this.appStore);
	dropEvents = []; // TODO computed get
	dropEventTimelines = {
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
	};

	serialize(): Program {
		return {} as Program; // TODO serialize to file format
	}

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}

	loadProgram(program: Program) {
		// TODO this needs to be fixed up
		program.dropEvents.forEach((event) => {
			// TODO schema should use "drums" instead of "drum"
			const kind: "bass" | "drums" | "vibraphone" =
				event.kind === "drum" ? "drums" : event.kind;

			if (kind == "bass") {
				const e = event as BassDropEvent;
				this.dropEventTimelines[kind][e.string].addFromJSONEvent(
					new BassDropE(event)
				);
			} else if (kind == "drums") {
				const e = event as DrumDropEvent;
				this.dropEventTimelines[kind][e.drum].addFromJSONEvent(
					((event as unknown) as HihatEvent).closed !== undefined
						? new HiHatDropE(event)
						: new DropE(event)
				); // TODO need something for open hat
			} else if (kind == "vibraphone") {
				const e = event as VibraphoneDropEvent;
				// TODO schema "channel" should be called "bar"
				this.dropEventTimelines[kind][e.channel].addFromJSONEvent(
					new VibraphoneDropE(event)
				);
			}
		});

		// TODO gonna have to deal with this when using dynamic bpm
		this.state.machine.bpm = program.state.machine.bpm;
		this.metadata.tpq = program.metadata.tpq;
	}
}

class ProgramMetadataStore implements ProgramMetadata {
	appStore: AppStore;

	title = "Untitled";
	author = "Unknown Author";
	@observable tpq: 240 = 240; // TODO interface in schema shouldn't force 240
	version = "0.1.0-beta";
	readonly length = 61440;
	procrastination = 69420;

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}
