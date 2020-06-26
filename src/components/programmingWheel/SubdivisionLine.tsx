import React from "react";
import { computed } from "mobx";
import { WheelComponent } from "../storeComponents";

interface SubdivisionLineProps {
	tick: number;
}

class SubdivisionLine_ extends WheelComponent<SubdivisionLineProps> {
	@computed get y() {
		return this.wheel.tickToPixel(this.props.tick);
	}
	@computed get stroke() {
		return this.wheel.subdivisionLineFunction(this.props.tick).stroke;
	}
	@computed get strokeWidth() {
		return this.wheel.subdivisionLineFunction(this.props.tick).strokeWidth;
	}

	render() {
		return (
			<g style={{ transform: `translateY(${this.y}px)` }}>
				<line
					x1={0}
					x2={this.wheel.visiblePixelWidth}
					stroke={this.stroke}
					strokeWidth={this.strokeWidth}
				/>
			</g>
		);
	}
}

export const SubdivisionLine = WheelComponent.sync(SubdivisionLine_);
