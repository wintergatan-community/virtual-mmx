import { Program, ProgramMetadata, MachineState } from "vmmx-schema";
import { VmmxPlayer } from "../core/playback/player";
import { BassStore } from "./bass";
import { DrumsStore } from "./drums";
import { VibraphoneStore } from "./vibraphone";
import { observable } from "mobx";

export class AppStore {
	program = new ProgramStore(this);
	player = new VmmxPlayer(this);

	loadProgram(program: Program) {
		this.player.loadEvents(program.dropEvents);
		this.program.state.machine.bpm = program.state.machine.bpm;
		this.program.metadata.tpq = program.metadata.tpq;
	}
}

// TODO can't implement Program until confusing change is done in schema
class ProgramStore /* implements Program*/ {
	appStore: AppStore;

	metadata = new ProgramMetadataStore(this.appStore);
	state = new StateStore(this.appStore);
	dropEvents = [];

	serialize(): Program {
		return {} as Program; // TODO serialize to file format
	}

	constructor(appStore: AppStore) {
		this.appStore = appStore;
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
class StateStore /*implements State*/ {
	appStore: AppStore;

	machine = new MachineStore(this.appStore);
	vibraphone = new VibraphoneStore(this.appStore);
	bass = new BassStore(this.appStore);
	drums = new DrumsStore(this.appStore);
	// hihatMachine = new HihatMachineStore(this.appStore);

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}

	// consumeEvent(event: Event) {}
}

class MachineStore implements MachineState {
	appStore: AppStore;

	mute = {
		bassdrum: false,
		hihat: false,
		snare: false,
		vibraphone: false,
		bass: false,
	};
	@observable bpm = 180;
	flywheelConnected = true;

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}
