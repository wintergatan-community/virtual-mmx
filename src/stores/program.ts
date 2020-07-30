import {
	Program,
	BassString,
	VibraphoneChannel,
	BassDropEvent,
	DrumDropEvent,
	VibraphoneDropEvent,
	ProgramMetadata,
} from "vmmx-schema";
import { AppStore } from "./app";
import {
	BassBakedData,
	bassStrings,
	DrumTypeTOFIX,
	DrumsBakedData,
	drumTypes,
	VibraphoneBakedData,
	vibraphoneBars,
} from "../toFutureSchema";
import { observable } from "mobx";
import { StateStore } from "./state";
import { mapToEventTimelines } from "./eventTimeline";

export class ProgramStore implements Program {
	appStore: AppStore;

	metadata = new ProgramMetadataStore(this.appStore);
	state = new StateStore(this.appStore);
	dropEvents = []; // TODO computed get
	dropEventTimelines = {
		bass: mapToEventTimelines<BassString, BassBakedData>(bassStrings),
		drums: mapToEventTimelines<DrumTypeTOFIX, DrumsBakedData>(drumTypes), // TODO might want separate drum events
		vibraphone: mapToEventTimelines<VibraphoneChannel, VibraphoneBakedData>(
			vibraphoneBars
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
				this.dropEventTimelines[kind][e.string].add({
					fret: e.fret,
					tick: event.tick,
				});
			} else if (kind == "drums") {
				const e = event as DrumDropEvent;
				this.dropEventTimelines[kind][e.drum].add({ tick: event.tick }); // TODO need something for open hat
			} else if (kind == "vibraphone") {
				const e = event as VibraphoneDropEvent;
				// TODO schema "channel" should be called "bar"
				this.dropEventTimelines[kind][e.channel].add({ tick: event.tick });
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
