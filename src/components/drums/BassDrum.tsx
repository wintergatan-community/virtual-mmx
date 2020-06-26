import React from "react";
import { DrumsComponent } from "../storeComponents";

class BassDrum_ extends DrumsComponent {
	// TODO confirm BassDrum or KickDrum?
	render() {
		return (
			<g style={{ transform: "translate(27.3px, 35.3px)" }}>
				<circle r={12} fill="rgb(195, 195, 195)" />
				<circle r={10} fill="rgb(247, 247, 247)" />
				<circle r={1.6} fill="rgb(99, 99, 99)" />
			</g>
		);
	}
}

export const BassDrum = DrumsComponent.sync(BassDrum_);
