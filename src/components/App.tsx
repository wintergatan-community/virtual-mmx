import React from "react";
import { ProgrammingWheel } from "./programEditor/ProgrammingWheel";
import { TransportControls } from "./transport/TransportContols";
import { MockupLayout } from "./mockupLayout/MockupLayout";
import { observer } from "mobx-react";
import { Vibraphone } from "./vibraphone/Vibraphone";
import { Drums } from "./drums/Drums";
import { SomeReactChildren } from "../core/types";
// import { SpringTesting } from "./testing/SpringTesting";
// import { TimingTesting } from "./timingTesting/TimingTesting";

export const App = observer(() => {
	return (
		<>
			<MockupLayout />

			<Move x={78} y={82}>
				<ProgrammingWheel />
				<TransportControls />
			</Move>

			<Move x={100} y={600}>
				<Vibraphone />
			</Move>

			<Move x={517} y={600}>
				<Drums />
			</Move>
		</>
	);
});

interface MoveProps {
	children: SomeReactChildren;
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
