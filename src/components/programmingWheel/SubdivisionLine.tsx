import React from "react";
import { computed } from "mobx";
import { WheelComponent } from "../storeComponents";
import { TranslateGrid } from "./TranslateGrid";

interface SubdivisionLineProps {
	tick: number;
}

class SubdivisionLine_ extends WheelComponent<SubdivisionLineProps> {
	@computed get stroke() {
		return this.wheel.subdivisionLineFunction(this.props.tick).stroke;
	}
	@computed get strokeWidth() {
		return this.wheel.subdivisionLineFunction(this.props.tick).strokeWidth;
	}

	render() {
		return (
			<TranslateGrid tick={this.props.tick}>
				<line
					x1={0}
					x2={this.wheel.visiblePixelWidth}
					stroke={this.stroke}
					strokeWidth={this.strokeWidth}
				/>
			</TranslateGrid>
		);
	}
}

export const SubdivisionLine = WheelComponent.sync(SubdivisionLine_);
