import React from "react";
import { WheelComponent } from "../storeComponents";

class Blur_ extends WheelComponent {
	// TODO shadows still need work

	render() {
		return (
			<>
				<defs>
					<filter id="wheelBlurTop" height="200%">
						<feOffset dy={30} />
						<feGaussianBlur stdDeviation={10} />
						<feBlend in="SourceGraphic" />
					</filter>
				</defs>
				<rect
					x={0}
					y={-70}
					width={this.wheel.visiblePixelWidth}
					height={70}
					style={{ fill: "#ddd2", filter: "url(#wheelBlurTop)" }}
				/>
				<rect
					x={0}
					y={-70 - this.wheel.visiblePixelHeight}
					width={this.wheel.visiblePixelWidth}
					height={70}
					style={{
						fill: "#000a",
						filter: "url(#wheelBlurTop)",
						transform: `rotate(180deg)`,
						transformOrigin: "50% 0%",
					}}
				/>
			</>
		);
	}
}

export const Blur = WheelComponent.sync(Blur_);
