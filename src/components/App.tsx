import React, { Component, ReactNode } from "react";
import { TransportControls } from "./transportControls/TransportContols";
import { Vibraphone } from "./vibraphone/Vibraphone";
import { Drums } from "./drums/Drums";
import { HiHatMachine } from "./hiHatMachine/HiHatMachine";
import { Bass } from "./bass/Bass";
import { AppStore } from "../stores/app";
import { Provider } from "mobx-react";
import { ProgrammingWheel } from "./programmingWheel/ProgrammingWheel";
import { ToneIndicator } from "./ToneIndicator";
import sampleProgram from "../sampleProgram.json";
import { Program } from "vmmx-schema";
import { Crank } from "./crank/Crank";
import { MutingLevers } from "./mutingLevers/MutingLevers";
import { PerformanceEditor } from "./performanceEditor/PerformanceEditor";
import { MuteE, CapoE } from "../core/eventTimelines/concrete";

const app = new AppStore();
app.loadProgram(sampleProgram as Program);
const mute = app.performance.eventTimelines.machine.channelMute;

const addMute = (m: boolean, tick: number) => {
	const difs = mute.vibraphone.getAddDifs(new MuteE({ mute: m, tick }));
	if (difs) {
		mute.vibraphone.applyDifs(difs);
	} else {
		console.log("Cant place");
	}
};

addMute(true, 500);
addMute(false, 700);

const capo = app.performance.eventTimelines.bass.capo[1];
const addCapo = (moveFret: number, tick: number) => {
	const difs = capo.getAddDifs(new CapoE({ moveFret, tick }));
	if (difs) {
		capo.applyDifs(difs);
	} else {
		console.log("Cant place");
	}
};

addCapo(7, 0);
addCapo(2, 200);
addCapo(15, 500);
addCapo(8, 640);

export class App extends Component {
	render() {
		return (
			<Provider app={app}>
				{/* <MockupLayout /> */}
				<ToneIndicator />

				<Move x={78} y={82}>
					<ProgrammingWheel />
				</Move>
				<Move x={100} y={600}>
					<Vibraphone />
				</Move>
				<Move x={517} y={600}>
					<Drums />
				</Move>
				<Move x={670} y={660}>
					<HiHatMachine />
				</Move>
				<Move x={768} y={80}>
					<Bass />
				</Move>
				<Move x={890} y={231}>
					<Crank />
				</Move>
				<Move x={890} y={81}>
					<MutingLevers />
				</Move>
				<Move x={889} y={624}>
					<TransportControls />
				</Move>

				{/* <Move x={860} y={460}>
					<Spinny />
				</Move> */}
				<PerformanceEditor />
			</Provider>
		);
	}
}

interface MoveProps {
	children: ReactNode;
	x: number;
	y: number;
}

function Move(props: MoveProps) {
	return (
		<div
			style={{
				position: "absolute",
				transform: `translate(${props.x}px, ${props.y}px)`,
			}}
		>
			{props.children}
		</div>
	);
}
