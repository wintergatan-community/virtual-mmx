import { BassState, BassString, Note } from "vmmx-schema";
import { AppStore } from "./app";
import { observable, computed } from "mobx";
import { fromEntries } from "../core/helpers/functions";
import { bassStrings } from "../toFutureSchema";

export class BassStore implements BassState {
	appStore: AppStore;

	@observable capos: Record<BassString, number> = {
		// TODO should use Record and prevent optional in schema
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	};
	@observable tuning: Record<BassString, Note> = {
		// TODO should use Record and prevent optional in schema
		1: "E2",
		2: "A2",
		3: "D3",
		4: "G3",
	};

	// TODO would be nice if this were prettier
	@observable stringStores: Record<BassString, BassStringStore> = fromEntries(
		bassStrings.map((string) => [
			string,
			new BassStringStore(string, this.tuning, this.capos),
		])
	);

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}

export class BassStringStore {
	tuningObj: Record<BassString, Note>;
	caposObj: Record<BassString, number>;

	string: BassString;

	@computed get tuning(): Note {
		return this.tuningObj[this.string];
	}
	@computed get capo(): number {
		return this.caposObj[this.string];
	}

	moveCapo(fret: number) {
		this.caposObj[this.string] = fret;
	}

	constructor(
		string: BassString,
		tuningObj: Record<BassString, Note>,
		caposObj: Record<BassString, number>
	) {
		this.tuningObj = tuningObj;
		this.caposObj = caposObj;
		this.string = string;
	}
}
