import { HihatState } from "vmmx-schema";
import { AppStore } from "./app";

// TODO can't impement DrumsState until schema change
export class DrumsStore /* implements DrumsState */ {
	hihatStore = new HihatStore();
}

class HihatStore implements HihatState {
	closed = true; // TODO this should be number not boolean
}
