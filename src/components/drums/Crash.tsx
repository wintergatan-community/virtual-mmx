import React from "react";
import { DrumsComponent } from "../storeComponents";

class Crash_ extends DrumsComponent {
	render() {
		return (
			<g style={{ transform: "translate(50px, 91px)" }}>
				<ellipse
					rx={34}
					ry={8}
					fill="rgb(253, 227, 165)"
					stroke="rgb(209, 179, 107)"
					strokeWidth={1}
				/>

				<rect
					x={-4}
					y={-2}
					width={8}
					height={4}
					rx={2}
					fill="rgb(111, 111, 111)"
				/>
			</g>
		);
	}
}
export const Crash = DrumsComponent.sync(Crash_);
