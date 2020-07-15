import React, { Component, ReactNode } from "react";
import { TransportControls } from "./transportControls/TransportContols";
import { MockupLayout } from "./mockupLayout/MockupLayout";
import { Vibraphone } from "./vibraphone/Vibraphone";
import { Drums } from "./drums/Drums";
import { Bass } from "./bass/Bass";
import { AppStore } from "../stores/app";
import { Provider } from "mobx-react";
import { ProgrammingWheel } from "./programmingWheel/ProgrammingWheel";
import { ToneIndicator } from "./ToneIndicator";
import sampleProgram from "../sampleProgram.json";
import { Program } from "vmmx-schema";
import { Crank } from "./crank/Crank";
import { MutingLevers } from "./mutingLevers/MutingLevers";

const app = new AppStore();
app.loadProgram(sampleProgram as Program);

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
