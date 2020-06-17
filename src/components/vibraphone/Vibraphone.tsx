import React, { Component } from "react";
import { VibraphoneNote } from "./VibraphoneNote";
import "./Vibraphone.css";
import { vibraphoneChannels } from "../../core/playback/instruments";

const wholeWidth = 400;
const noteWidth = wholeWidth / 11;
const noteWidthPadded = noteWidth * 0.9;

export const vibra = { wholeWidth, noteWidth, noteWidthPadded };

export class Vibraphone extends Component {
	height = 160;

	render() {
		return (
			<svg
				viewBox={`0 0 ${wholeWidth} ${this.height}`}
				style={{
					width: wholeWidth,
					height: this.height,
					border: "1px red solid",
				}}
			>
				<g style={{ transform: `translateY(${this.height / 2}px)` }}>
					{vibraphoneChannels.map((channel) => (
						<VibraphoneNote channel={channel} key={channel} />
					))}
				</g>
			</svg>
		);
	}
}
