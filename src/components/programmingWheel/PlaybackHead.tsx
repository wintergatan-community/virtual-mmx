import React from "react";
import { TranslateGrid } from "./TranslateGrid";
import { WheelComponent } from "../storeComponents";

class PlaybackHead_ extends WheelComponent {
	render() {
		return (
			<TranslateGrid tick={this.wheel.playbackHeadTick}>
				<line
					x1={0}
					x2={this.wheel.visiblePixelWidth}
					y1={0}
					y2={0}
					stroke="green"
					strokeWidth={1.5}
				/>
			</TranslateGrid>
		);
	}
}

export const PlaybackHead = WheelComponent.sync(PlaybackHead_);
