import React from "react";
import { ProgrammingWheel } from "./programEditor/ProgrammingWheel";
import { TransportControls } from "./transport/TransportContols";
import { MockupLayout } from "./mockupLayout/MockupLayout";
import { observer } from "mobx-react";
import { Vibraphone } from "./vibraphone/Vibraphone";
import { Drums } from "./drums/Drums";
import { SomeReactChildren } from "../core/types";
import { Bass } from "./bass/Bass";
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

			<Move x={768} y={80}>
				<Bass />
			</Move>
			<Move x={860} y={60}>
				{/* <Spinny /> */}
			</Move>
			{/* <Move x={500} y={60}>
				<svg
					viewBox="-50 -50 100 100"
					style={{
						width: 400,
						height: 400,
						border: "red 2px solid",
						overflow: "shown",
					}}
				>
					<image
						x={-50}
						y={-50}
						href={
							"https://cdn3.whatculture.com/images/2018/01/64459b9c0850d400-600x338.jpg"
						}
					/>
				</svg>
			</Move> */}
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
