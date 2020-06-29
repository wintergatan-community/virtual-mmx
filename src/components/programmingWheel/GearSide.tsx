import React from "react";
import { WheelComponent } from "../storeComponents";
import { computed } from "mobx";
import gearSideImg from "./woodgear_tileable.png";

interface GearSideProps {
	tick: number;
}

class GearSide_ extends WheelComponent<GearSideProps> {
	@computed get y() {
		return this.wheel.tickToPixel(this.props.tick);
	}
	@computed get height() {
		return this.wheel.visiblePixelHeight;
	}
	width = 26;

	render() {
		return (
			<div
				style={{ width: this.width, height: this.height, overflow: "hidden" }}
			>
				<div
					style={{
						transform: `scaleY(1.1)`,
						backgroundImage: `url("${gearSideImg}")`,
						backgroundSize: this.width,
						width: this.width,
						height: this.height,
						backgroundPositionY: this.y,
						// backgroundRepeat: "repeat-y",
						overflow: "hidden",
					}}
				/>
			</div>
		);
	}
}

export const GearSide = WheelComponent.sync(GearSide_);
