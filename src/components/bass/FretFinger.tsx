import React from "react";
import { BassComponent } from "../storeComponents";
import { computed, observable, action } from "mobx";
import { Spring, config } from "react-spring/renderprops";
import { observer } from "mobx-react";

class FretFinger_ extends BassComponent {
	@computed get x() {
		const mouseX = this.bass.mouseTracker.mousePos?.x;
		if (!mouseX) return 0;
		return this.bass.stringToPixel(Math.round(this.bass.pixelToString(mouseX)));
	}
	@computed get y() {
		const mouseY = this.bass.mouseTracker.mousePos?.y;
		if (!mouseY) return 0;

		return (
			this.bass.fretToPixel(Math.ceil(this.bass.pixelToFret(mouseY))) -
			this.bass.fretHeight / 2
		);
	}

	render() {
		return (
			<circle
				style={{ pointerEvents: "none", transition: `0.2s` }}
				cx={this.x}
				cy={this.y}
				r={10}
				fill={true ? "black" : "white"}
			/>
		);
	}
}

export const FretFinger = BassComponent.sync(FretFinger_);
