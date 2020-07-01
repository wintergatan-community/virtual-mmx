import React from "react";
import { computed } from "mobx";
import { BassComponent } from "../storeComponents";

interface FretProps {
	fret: number;
	markings: number[];
}

class Fret_ extends BassComponent<FretProps> {
	@computed get y() {
		return this.props.fret * this.bass.fretHeight;
	}
	@computed get midFret() {
		return -this.bass.fretHeight / 2;
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
					x2={this.bass.viewWidth}
					y1={0}
					y2={0}
					stroke="rgb(239, 239, 239)"
				/>
				{this.props.markings.map((marking) => (
					<circle
						cx={this.bass.stringToPixel(marking)}
						cy={this.midFret}
						r={5}
						fill="rgb(96, 90, 80)"
						key={marking}
					/>
				))}
			</g>
		);
	}
}

export const Fret = BassComponent.sync(Fret_);
