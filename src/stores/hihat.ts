import { HihatMachineState } from "vmmx-schema";
import { AppStore } from "./app";

export class HihatMachineStore implements HihatMachineState {
	appStore: AppStore;

	setting = "hihattable KA KA KA";

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}
