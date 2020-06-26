import React from "react";
import { WheelChannel } from "./WheelChannel";
import { SubdivisionLine } from "./SubdivisionLine";
import { WheelComponent } from "../storeComponents";

class ProgramGrid_ extends WheelComponent {
	render() {
		return (
			<>
				<WheelChannels />
				<SubdivisionLines />
			</>
		);
	}
}

export const ProgramGrid = WheelComponent.sync(ProgramGrid_);

class SubdivisionLines_ extends WheelComponent {
	render() {
		return (
			<g>
				{this.wheel.subdivisionLines.map((tick) => (
					<SubdivisionLine tick={tick} key={tick} />
				))}
			</g>
		);
	}
}

const SubdivisionLines = WheelComponent.sync(SubdivisionLines_);

class WheelChannels_ extends WheelComponent {
	render() {
		return (
			<g>
				{this.wheel.instrumentChannels.map((channel, channelNumber) => {
					return (
						<WheelChannel
							channel={channel}
							channelNumber={channelNumber}
							key={channelNumber}
						/>
					);
				})}
			</g>
		);
	}
}

const WheelChannels = WheelComponent.sync(WheelChannels_);
