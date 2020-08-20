import React from "react";
import { observable, action } from "mobx";
import { AppComponent } from "../storeComponents";

import { SpringPulse } from "../../core/helpers/springPulse";
import { HiHatMachineMode } from "../../toFutureSchema";
import { ModeSelector } from "./ModeSelector";
import { HiHatMachineBrass } from "./HiHatMachineBrass";

const hatRotation: Record<HiHatMachineMode, number> = {
	beat: -30,
	beatAndOffbeat: -20,
	offbeat: -10,
	offbeatAndSixteenth: 0,
	sixteenth: 10,
	sixteenthAndTriplet: 20,
	triplet: 30,
	off: 45,
};

class HiHatMachine_ extends AppComponent {
	// Will move to store
	@observable currentMode: HiHatMachineMode = "beat";
	rotationSpring = new SpringPulse();

	componentDidMount() {
		this.rotationSpring.stiffness = 800;
		this.rotationSpring.damping = 100;
		this.rotationSpring.snapTo(hatRotation[this.currentMode]);
	}

	@action.bound select(mode: HiHatMachineMode) {
		this.currentMode = mode;
		let rot = hatRotation[mode];
		if (mode === "off" && this.rotationSpring.value < 0) rot = -rot;
		this.rotationSpring.moveTo(rot);
	}

	render() {
		return (
			<div style={{ position: "relative", width: "80%" }}>
				<ModeSelector currentMode={this.currentMode} selectMode={this.select} />
				<HiHatMachineBrass angle={this.rotationSpring.value} />
			</div>
		);
	}
}

export const HiHatMachine = AppComponent.sync(HiHatMachine_);
