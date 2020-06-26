import { HihatState } from "vmmx-schema";
import { AppStore } from "./app";

// TODO can't impement DrumsState until schema change
export class DrumsStore /* implements DrumsState */ {
	appStore: AppStore;

	hihatStore = new HihatStore();

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}

class HihatStore implements HihatState {
	closed = true; // TODO this should be number not boolean
}
