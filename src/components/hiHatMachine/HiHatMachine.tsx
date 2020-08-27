import { signal } from "../../core/helpers/solid";

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

export const HiHatMachine = () => {
	// Will move to store
	const currentMode = signal<HiHatMachineMode>("beat");
	const rotationSpring = new SpringPulse();

	rotationSpring.stiffness = 800;
	rotationSpring.damping = 100;
	rotationSpring.snapTo(hatRotation[currentMode()]);

	function select(mode: HiHatMachineMode) {
		currentMode(mode);
		let rot = hatRotation[mode];
		if (mode === "off" && rotationSpring.value < 0) rot = -rot;
		rotationSpring.moveTo(rot);
	}

	return (
		<div
			style={{
				display: "grid",
				"place-items": "center",
				transform: "translate(0px, 85px)", // TODO temp fix
			}}
		>
			<div style={{ position: "relative", width: "80%" }}>
				<ModeSelector currentMode={currentMode} selectMode={select} />
				<HiHatMachineBrass angle={rotationSpring.value} />
			</div>
		</div>
	);
};
