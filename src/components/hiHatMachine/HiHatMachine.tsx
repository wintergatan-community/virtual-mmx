import React from "react";
import { observable, action } from "mobx";
import { AppComponent } from "../storeComponents";

import { HiHatMachineMode } from "../../toFutureSchema";
import { ModeSelector } from "./ModeSelector";
import { HiHatMachineBrass } from "./HiHatMachineBrass";

class HiHatMachine_ extends AppComponent {
	// Will move to store
	@observable currentMode: HiHatMachineMode = "beat";

	@action.bound select(mode: HiHatMachineMode) {
		this.currentMode = mode;
	}

	render() {
		return (
			<div>
				<ModeSelector currentMode={this.currentMode} selectMode={this.select} />
				<HiHatMachineBrass angle={0} />
			</div>
		);
	}
}

export const HiHatMachine = AppComponent.sync(HiHatMachine_);
