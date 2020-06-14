import React, { Component } from "react";
import { observer } from "mobx-react";
import { Snare } from "./Snare";
import { BassDrum } from "./BassDrum";
import { HiHat } from "./HiHat";
import { Crash } from "./Crash";

@observer
export class Drums extends Component {
	width = 160;
	height = 160;

	render() {
		return (
			<svg
				viewBox={`0 0 ${100} ${100}`}
				style={{
					width: this.width,
					height: this.height,
					border: "1px green solid",
				}}
			>
				<Snare />
				<BassDrum />
				<HiHat />
				<Crash />
			</svg>
		);
	}
}
