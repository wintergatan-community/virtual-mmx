import React, { Component } from "react";
import { computed } from "mobx";
import { global } from "../../contexts/StoreContext";
import { VibraphoneNote } from "./VibraphoneNote";
import "./Vibraphone.css";

const wholeWidth = 400;
const noteWidth = wholeWidth / 11;
const noteWidthPadded = noteWidth * 0.9;

export const vibra = { wholeWidth, noteWidth, noteWidthPadded };

export class Vibraphone extends Component {
	height = 160;

	@computed get parts() {
		return Object.entries(global.player.instruments.vibraphone.parts);
	}

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
					{this.parts.map(([channel, part]) => (
						<VibraphoneNote
							part={part}
							channel={parseInt(channel)}
							key={channel}
						/>
					))}
				</g>
			</svg>
		);
	}
}
