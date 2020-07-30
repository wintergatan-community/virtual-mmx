export default "";

// import {
// 	Program,
// 	ProgramMetadata,
// 	MachineState,
// 	Performance,
// 	PerformanceMetadata,
// 	State,
// 	TimedEvent,
// 	BassString,
// 	VibraphoneChannel,
// 	HihatMachineState,
// 	HihatState,
// 	BassDropEvent,
// 	DrumDropEvent,
// 	VibraphoneDropEvent,
// } from "vmmx-schema";
// import { VmmxPlayer } from "../core/playback/player";
// import { BassStore } from "./bass";
// import { DrumsStore } from "./drums";
// import { VibraphoneStore } from "./vibraphone";
// import { observable } from "mobx";
// import {
// 	insertInOrder,
// 	removeInOrder,
// 	mapArrayToObj,
// 	ObjectKey,
// } from "../core/helpers/functions";
// import {
// 	bassStrings,
// 	drumTypes,
// 	vibraphoneBars,
// 	instruments,
// } from "../core/playback/types";
// import { DrumTypeTOFIX } from "../core/playback/instruments/drums";

// type EventTimelineRecord<
// 	Key extends string | number | symbol,
// 	EventData
// > = Record<Key, EventTimeline<EventData>>;

// interface JointTimelineProps<
// 	Key extends string | number | symbol,
// 	ProgEventData,
// 	PerfEventData
// > {
// 	program: EventTimelineRecord<Key, ProgEventData>;
// 	performance: EventTimelineRecord<Key, PerfEventData>;
// }
// class JointTimeline<
// 	Key extends string | number | symbol,
// 	ProgEventData,
// 	PerfEventData
// > {
// 	program: EventTimelineRecord<Key, ProgEventData>;
// 	performance: EventTimelineRecord<Key, PerfEventData>;

// 	constructor({
// 		program,
// 		performance,
// 	}: JointTimelineProps<Key, ProgEventData, PerfEventData>) {
// 		this.program = program;
// 		this.performance = performance;
// 	}
// }
// export class AppStore {
// 	performance = new PerformanceStore(this);
// 	player = new VmmxPlayer(this);
// 	jointTimelines = mapArrayToObj(
// 		instruments,
// 		(instrument) =>
// 			new JointTimeline({
// 				performance: this.performance.eventTimelines.performanceDrop[
// 					instrument
// 				],
// 				program: this.performance.program.dropEventTimelines[instrument],
// 			})
// 	);

// 	loadProgram(program: Program) {
// 		this.performance.program.loadProgram(program);
// 	}
// }
// export type ChannelGroupTOFIX = DrumTypeTOFIX | "vibraphone" | "bass";
// const channelGroups: ChannelGroupTOFIX[] = [
// 	"bassdrum",
// 	"hihat",
// 	"snare",
// 	"crash",
// 	"vibraphone",
// 	"bass",
// ]; // TODO move to schema or at least out of here

// interface PerformanceDropTimelines {
// 	bass: Record<BassString, EventTimeline<true>>;
// 	drums: Record<DrumTypeTOFIX, EventTimeline<true>>;
// 	vibraphone: Record<VibraphoneChannel, EventTimeline<true>>;
// }
// interface ProgramDropTimelines {
// 	bass: Record<BassString, EventTimeline<{ fret?: number }>>;
// 	drums: Record<DrumTypeTOFIX, EventTimeline<{ closeHat?: boolean }>>;
// 	vibraphone: Record<VibraphoneChannel, EventTimeline<true>>;
// }

// class PerformanceStore implements Performance {
// 	appStore: AppStore;

// 	metadata: PerformanceMetadata = {
// 		title: "Untitled",
// 		author: "Unknown Author",
// 	};
// 	program: ProgramStore = new ProgramStore(this.appStore);
// 	initialState: State = {} as State;
// 	events: TimedEvent[] = []; // TODO these last two lines are currently unimplemented garbage

// 	eventTimelines = {
// 		performanceDrop: {
// 			bass: mapToEventTimelines(bassStrings),
// 			drums: mapToEventTimelines(drumTypes),
// 			vibraphone: mapToEventTimelines(vibraphoneBars),
// 		} as PerformanceDropTimelines,
// 		machine: {
// 			channelMute: mapToEventTimelines<ChannelGroupTOFIX, boolean>(
// 				channelGroups
// 			),
// 		},
// 		vibraphone: {
// 			vibratoEnabled: new EventTimeline<boolean>(),
// 			vibratoSpeed: new EventTimeline<number>(),
// 		},
// 		hihatMachine: undefined, // TODO not sure what to do with this yet
// 		hihat: {
// 			closed: new EventTimeline<boolean>(),
// 		},
// 		bass: {
// 			capo: mapToEventTimelines<BassString, number>(bassStrings),
// 		},
// 	};

// 	constructor(appStore: AppStore) {
// 		this.appStore = appStore;
// 	}
// }

// function mapToEventTimelines<Key extends ObjectKey, E>(arr: Key[]) {
// 	return mapArrayToObj(arr, () => new EventTimeline<E>());
// }

// type Listener<E> = (tick: number, event: E) => void;

// export class EventTimeline<E /* extends Event*/> {
// 	events: E[] = [];
// 	eventListeners: Listener<E>[] = [];
// 	eventTickListeners: Record<number, Listener<E>[]> = [];
// 	addEventListeners: Listener<E>[] = [];
// 	removeEventListeners: ((tick: number) => void)[] = [];

// 	add(tick: number, event: E) {
// 		insertInOrder(event, tick, this.events);
// 		this.addEventListeners.forEach((l) => l(tick, event));
// 	}
// 	remove(tick: number) {
// 		removeInOrder((_, searchTick) => searchTick === tick, this.events);
// 		this.removeEventListeners.forEach((l) => l(tick));
// 	}

// 	onAdd(listener: Listener<E>) {
// 		this.addEventListeners.push(listener);
// 	}
// 	onRemove(listener: (tick: number) => void) {
// 		this.removeEventListeners.push(listener);
// 	}

// 	triggerEvent(tick?: number) {
// 		const t = tick ?? -1; // TODO maybe not too elegent
// 		const event = this.events[t];
// 		this.eventListeners.forEach((l) => l(t, event));
// 		this.eventTickListeners[t].forEach((l) => l(t, event));
// 	}

// 	addEventListener(listener: Listener<E>, tick?: number) {
// 		if (tick == undefined) {
// 			this.eventListeners.push(listener);
// 		} else {
// 			this.eventTickListeners[tick].push(listener);
// 		}
// 	}
// }

// // TODO can't implement Program until confusing change is done in schema
// export class ProgramStore implements Program {
// 	appStore: AppStore;

// 	metadata = new ProgramMetadataStore(this.appStore);
// 	state = new StateStore(this.appStore);
// 	dropEvents = []; // TODO computed get
// 	dropEventTimelines: ProgramDropTimelines = {
// 		bass: mapToEventTimelines(bassStrings),
// 		drums: mapToEventTimelines(drumTypes), // TODO might want separate drum events
// 		vibraphone: mapToEventTimelines(vibraphoneBars),
// 	};

// 	serialize(): Program {
// 		return {} as Program; // TODO serialize to file format
// 	}

// 	constructor(appStore: AppStore) {
// 		this.appStore = appStore;
// 	}

// 	loadProgram(program: Program) {
// 		program.dropEvents.forEach((event) => {
// 			// TODO schema should use "drums" instead of "drum"
// 			const kind: "bass" | "drums" | "vibraphone" =
// 				event.kind === "drum" ? "drums" : event.kind;

// 			if (kind == "bass") {
// 				const e = event as BassDropEvent;
// 				this.dropEventTimelines[kind][e.string].add(event.tick, {
// 					fret: e.fret,
// 				});
// 			} else if (kind == "drums") {
// 				const e = event as DrumDropEvent;
// 				this.dropEventTimelines[kind][e.drum].add(event.tick, {}); // TODO need something for open hat
// 			} else if (kind == "vibraphone") {
// 				const e = event as VibraphoneDropEvent;
// 				// TODO schema "channel" should be called "bar"
// 				this.dropEventTimelines[kind][e.channel].add(event.tick, true);
// 			}
// 		});

// 		// TODO gonna have to deal with this when using dynamic bpm
// 		this.state.machine.bpm = program.state.machine.bpm;
// 		this.metadata.tpq = program.metadata.tpq;
// 	}
// }

// class ProgramMetadataStore implements ProgramMetadata {
// 	appStore: AppStore;

// 	title = "Untitled";
// 	author = "Unknown Author";
// 	@observable tpq: 240 = 240; // TODO interface in schema shouldn't force 240
// 	version = "0.1.0-beta";
// 	readonly length = 61440;
// 	procrastination = 69420;

// 	constructor(appStore: AppStore) {
// 		this.appStore = appStore;
// 	}
// }

// // TODO can't implement State since State should have drums -> {hihat, snare, kick} structure
// class StateStore implements State {
// 	appStore: AppStore;

// 	machine = new MachineStore(this.appStore);
// 	vibraphone = new VibraphoneStore(this.appStore);
// 	bass = new BassStore(this.appStore);
// 	drums = new DrumsStore(this.appStore);
// 	// hihatMachine = new HihatMachineStore(this.appStore);

// 	constructor(appStore: AppStore) {
// 		this.appStore = appStore;
// 	}

// 	hihatMachine = {} as HihatMachineState; // TODO fix in schema
// 	hihat = {} as HihatState; // TODO fix in schema

// 	// consumeEvent(event: Event) {}
// }

// class MachineStore implements MachineState {
// 	appStore: AppStore;

// 	mute: Record<ChannelGroupTOFIX, boolean> = {
// 		bassdrum: false,
// 		hihat: false,
// 		snare: false,
// 		crash: false,
// 		vibraphone: false,
// 		bass: false,
// 	};
// 	@observable bpm = 180;
// 	flywheelConnected = true;

// 	constructor(appStore: AppStore) {
// 		this.appStore = appStore;
// 	}

// 	setMuted(channelGroup: ChannelGroupTOFIX, muted: boolean) {
// 		this.mute[channelGroup] = muted;
// 	}
// }
