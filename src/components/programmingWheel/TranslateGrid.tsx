import React, { ReactNode } from "react";
import { computed } from "mobx";
import { WheelComponent } from "../storeComponents";

interface TranslateProps {
	children: ReactNode;
	tick?: number;
	channel?: number;
}

class TranslateGrid_ extends WheelComponent<TranslateProps> {
	@computed get x() {
		return this.wheel.channelToPixel(this.props.channel ?? 0);
	}
	@computed get y() {
		return this.wheel.tickToPixel(this.props.tick ?? 0);
	}

	render() {
		return (
			<g transform={`translate(${this.x}, ${this.y})`}>
				<g>{this.props.children}</g>
			</g>
		);
	}
}

export const TranslateGrid = WheelComponent.sync(TranslateGrid_);
