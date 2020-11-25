import { AppStore } from "./app";
import { VibraphoneStore } from "./vibraphone";
import { BassStore } from "./bass";
import { DrumsStore } from "./drums";
import { MachineStore } from "./machine";
import { HihatMachineState, HihatState, State } from "vmmx-schema";

export class StateStore /* implements SomeSignalWrapped<State> */ {
	machine = new MachineStore();
	vibraphone = new VibraphoneStore();
	bass = new BassStore();
	drums = new DrumsStore();
	// hihatMachine = new HihatMachineStore(this.appStore);

	hihatMachine = {} as HihatMachineState; // TODO fix in schema
	hihat = {} as HihatState; // TODO fix in schema

	// consumeEvent(event: Event) {}
}
