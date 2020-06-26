import React from "react";
import { DrumsComponent } from "../storeComponents";

class Snare_ extends DrumsComponent {
	render() {
		return (
			<g style={{ transform: "translate(53px, 57px)" }}>
				<circle r={24} fill="rgb(144, 144, 144)" />
				<circle r={22} fill="rgb(51, 51, 51)" />
				<circle r={16.5} fill="rgb(247, 247, 247)" />
			</g>
		);
	}
}

export const Snare = DrumsComponent.sync(Snare_);
