import { VibraphoneState, VibraphoneChannel, Note } from "vmmx-schema";
import { AppStore } from "./app";
import { observable, computed } from "mobx";
import { vibraphoneBars } from "../core/playback/types";
import { mapArrayToObj } from "../core/helpers/functions";

export class VibraphoneStore implements VibraphoneState {
	appStore: AppStore;

	vibratoEnabled = true;
	vibratoSpeed = 1;

	notes: Record<VibraphoneChannel, Note> = {
		// TODO should change name in schema to "tuning" and should use Record type
		1: "B4",
		2: "C5",
		3: "D5",
		4: "E5",
		5: "F#5",
		6: "G5",
		7: "A5",
		8: "B5",
		9: "C6",
		10: "D6",
		11: "E6",
	};

	@observable barStores: Record<
		VibraphoneChannel,
		VibraphoneBarStore
	> = mapArrayToObj(
		vibraphoneBars,
		(bar) => new VibraphoneBarStore(bar, this.notes)
	);

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}

export class VibraphoneBarStore {
	notesObj: Record<VibraphoneChannel, Note>;
	bar: VibraphoneChannel;

	@computed get note() {
		return this.notesObj[this.bar];
	}

	constructor(
		bar: VibraphoneChannel,
		notesObj: Record<VibraphoneChannel, Note>
	) {
		this.bar = bar;
		this.notesObj = notesObj;
	}
}
