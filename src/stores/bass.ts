import { BassState, BassString, Note } from "vmmx-schema";
import { AppStore } from "./app";
import { fromEntries, mapArrayToObj } from "../core/helpers/functions";
import { bassStrings } from "../toFutureSchema";

export class BassStore implements BassState {
	appStore: AppStore;

	capos: Record<BassString, number> = {
		// TODO should use Record and prevent optional in schema
		1: 0,
		2: 0,
		3: 0,
		4: 0,
	};
	tuning: Record<BassString, Note> = {
		// TODO should use Record and prevent optional in schema
		1: "E2",
		2: "A2",
		3: "D3",
		4: "G3",
	};

	stringStores = mapArrayToObj(
		bassStrings,
		(string) => new BassStringStore(string, this.tuning, this.capos)
	);

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}
}

export class BassStringStore {
	tuningObj: Record<BassString, Note>;
	caposObj: Record<BassString, number>;

	string: BassString;

	get tuning() {
		return this.tuningObj[this.string];
	}
	get capo() {
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
