import { AppStore } from "./app";
import { VibraphoneStore } from "./vibraphone";
import { BassStore } from "./bass";
import { DrumsStore } from "./drums";
import { MachineStore } from "./machine";
import { HihatMachineState, HihatState, State } from "vmmx-schema";

export class StateStore /* implements SomeSignalWrapped<State> */ {
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
