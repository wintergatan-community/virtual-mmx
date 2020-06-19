import React, { Component } from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { bass } from "./Bass";

interface FretProps {
	fret: number;
	markings: number[];
}

@observer
export class Fret extends Component<FretProps> {
	@computed get y() {
		return this.props.fret * bass.fretHeight;
	}
	@computed get midFret() {
		return -bass.fretHeight / 2;
	}

	render() {
		return (
			<g
				style={{
					transform: `translateY(${this.y}px)`,
				}}
			>
				<line
					x1={1}
					x2={bass.viewWidth}
					y1={0}
					y2={0}
					stroke="rgb(239, 239, 239)"
				/>
				{this.props.markings.map((marking) => (
					<circle
						cx={marking * bass.viewWidth}
						cy={this.midFret}
						r={6}
						fill="rgb(96, 90, 80)"
						key={marking}
					/>
				))}
			</g>
		);
	}
}
