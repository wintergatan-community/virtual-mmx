import React from "react";
import { AppComponent } from "./storeComponents";
import { computed } from "mobx";

class ToneIndicator_ extends AppComponent {
	@computed get loaded() {
		return this.app.player.toneLoaded;
	}

	render() {
		return (
			<div
				style={{
					position: "absolute",
					background: this.loaded ? "lime" : "red",
					fontSize: 12,
					padding: 5,
					borderRadius: 8,
					transition: "0.5s",
					userSelect: "none",
				}}
			>
				{this.loaded ? "Tone Loaded" : "Tone Not Loaded"}
			</div>
		);
	}
}

export const ToneIndicator = AppComponent.sync(ToneIndicator_);
