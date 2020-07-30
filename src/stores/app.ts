import {
	Program,
	ProgramMetadata,
	MachineState,
	Performance,
	PerformanceMetadata,
	State,
	TimedEvent,
	BassString,
	VibraphoneChannel,
	HihatMachineState,
	HihatState,
	BassDropEvent,
	DrumDropEvent,
	VibraphoneDropEvent,
	CoreDropEvent,
} from "vmmx-schema";
import { VmmxPlayer } from "../core/playback/player";
import { BassStore } from "./bass";
import { DrumsStore } from "./drums";
import { VibraphoneStore } from "./vibraphone";
import { observable } from "mobx";
import {
	insertInOrder,
	removeInOrder,
	mapArrayToObj,
	ObjectKey,
} from "../core/helpers/functions";
import { bassStrings, drumTypes, vibraphoneBars } from "../core/playback/types";
import { DrumTypeTOFIX } from "../core/playback/instruments/drums";

export class JointEventTimeline<EventData extends CoreDropEvent> {
	program: EventTimeline<EventData>;
	performance: EventTimeline<EventData>;

	constructor(timelines: {
		program: EventTimeline<EventData>;
		performance: EventTimeline<EventData>;
	}) {
		this.program = timelines.program;
		this.performance = timelines.performance;
	}

	addJointEventListener(l: Listener<EventData>) {
		this.program.addEventListener(l);
		this.performance.addEventListener(l);
	}
}

export class AppStore {
	performance = new PerformanceStore(this);

	jointTimelines = {
		// TODO cant figure out how to let TypeScript let me do this better
		bass: mapArrayToObj(
			bassStrings,
			(bassString) =>
				new JointEventTimeline({
					program: this.prog.bass[bassString],
					performance: this.perf.bass[bassString],
				})
		),
		drums: mapArrayToObj(
			drumTypes,
			(drumType) =>
				new JointEventTimeline({
					program: this.prog.drums[drumType],
					performance: this.perf.drums[drumType],
				})
		),
		vibraphone: mapArrayToObj(
			vibraphoneBars,
			(vibraphoneBar) =>
				new JointEventTimeline({
					program: this.prog.vibraphone[vibraphoneBar],
					performance: this.perf.vibraphone[vibraphoneBar],
				})
		),
	};

	player = new VmmxPlayer(this);

	loadProgram(program: Program) {
		this.performance.program.loadProgram(program);
	}

	get prog() {
		return this.performance.program.dropEventTimelines;
	}
	get perf() {
		return this.performance.eventTimelines.performanceDrop;
	}
}
export type ChannelGroupTOFIX = DrumTypeTOFIX | "vibraphone" | "bass";
const channelGroups: ChannelGroupTOFIX[] = [
	"bassdrum",
	"hihat",
	"snare",
	"crash",
	"vibraphone",
	"bass",
]; // TODO move to schema or at least out of here

class PerformanceStore implements Performance {
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

function mapToEventTimelines<Key extends ObjectKey, E extends CoreDropEvent>(
	arr: Key[]
) {
	return mapArrayToObj(arr, () => new EventTimeline<E>());
}

type Listener<EventData> = (event?: EventData, time?: number) => void;

export class EventTimeline<E extends CoreDropEvent /* extends Event*/> {
	@observable events: E[] = [];
	eventListeners: Listener<E>[] = [];
	eventTickListeners: Record<number, Listener<E>[]> = [];
	addEventListeners: Listener<E>[] = [];
	removeEventListeners: Listener<E>[] = [];

	add(event: E) {
		insertInOrder(event, event.tick, this.events);
		this.addEventListeners.forEach((l) => l(event));
	}
	remove(tick: number) {
		const event = removeInOrder((event) => event.tick === tick, this.events);
		this.removeEventListeners.forEach((l) => l(event));
	}

	onAdd(listener: Listener<E>) {
		this.addEventListeners.push(listener);
	}
	onRemove(listener: Listener<E>) {
		this.removeEventListeners.push(listener);
	}

	triggerEvent(event?: E, time?: number) {
		if (event === undefined) {
			this.eventListeners.forEach((l) => l(undefined, time));
		} else {
			const tick = event.tick;
			this.eventListeners.forEach((l) => l(event, time));
			if (this.eventTickListeners[tick]) {
				this.eventTickListeners[tick].forEach((l) => l(event, time));
			}
		}
	}

	addEventListener(listener: Listener<E>, tick?: number) {
		if (tick == undefined) {
			this.eventListeners.push(listener);
		} else {
			this.eventTickListeners[tick] = this.eventTickListeners[tick] ?? [];
			this.eventTickListeners[tick].push(listener);
		}
	}
}

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

// TODO can't implement Program until confusing change is done in schema
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

// TODO can't implement State since State should have drums -> {hihat, snare, kick} structure
class StateStore implements State {
	appStore: AppStore;

	machine = new MachineStore(this.appStore);
	vibraphone = new VibraphoneStore(this.appStore);
	bass = new BassStore(this.appStore);
	drums = new DrumsStore(this.appStore);
	// hihatMachine = new HihatMachineStore(this.appStore);

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}

	hihatMachine = {} as HihatMachineState; // TODO fix in schema
	hihat = {} as HihatState; // TODO fix in schema

	// consumeEvent(event: Event) {}
}

class MachineStore implements MachineState {
	appStore: AppStore;

	mute: Record<ChannelGroupTOFIX, boolean> = {
		bassdrum: false,
		hihat: false,
		snare: false,
		crash: false,
		vibraphone: false,
		bass: false,
	};
	@observable bpm = 180;
	flywheelConnected = true;

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}

	setMuted(channelGroup: ChannelGroupTOFIX, muted: boolean) {
		this.mute[channelGroup] = muted;
	}
}
