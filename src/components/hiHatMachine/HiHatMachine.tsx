import React from "react";
import { observable, action } from "mobx";
import { AppComponent } from "../storeComponents";

import { ModeSelector } from "./ModeSelector";

// Will move to schema
export type HiHatMachineMode =
	| "beat"
	| "beatAndOffbeat"
	| "offbeat"
	| "offbeatAndSixteenth"
	| "sixteenth"
	| "sixteenthAndTriplet"
	| "triplet"
	| "off";

class HiHatMachine_ extends AppComponent {
	// Will move to store
	@observable currentMode: HiHatMachineMode = "beat";

	@action.bound select(mode: HiHatMachineMode) {
		this.currentMode = mode;
	}

	render() {
		return (
			<ModeSelector currentMode={this.currentMode} selectMode={this.select} />
		);
	}
}

export const HiHatMachine = AppComponent.sync(HiHatMachine_);
