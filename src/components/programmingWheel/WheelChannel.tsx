import React from "react";
import { ChannelPegs } from "./ChannelPegs";
import { TranslateGrid } from "./TranslateGrid";
import { VmmxInstrumentChannel } from "../../core/playback/types";
import { computed } from "mobx";
import { WheelComponent } from "../storeComponents";
import { ChannelColor } from "./programmingWheelDisplay";

interface WheelChannelProps {
	color: string;
	channel: VmmxInstrumentChannel;
	channelNumber: number;
	channelColor: ChannelColor;
}

class WheelChannel_ extends WheelComponent<WheelChannelProps> {
	@computed get width() {
		return this.wheel.tickToPixel(this.wheel.totalTicks);
	}
	@computed get channelOne() {
		// TODO move this away from this component
		return this.wheel.channelToPixel(1);
	}

	render() {
		console.log(this.props.channelColor);
		return (
			<TranslateGrid channel={this.props.channelNumber}>
				<rect
					width={this.channelOne}
					height={this.width}
					fill={this.props.channelColor}
					stroke="rgb(47, 47, 47)"
				/>
				<ChannelPegs channel={this.props.channel.channelPart} />
			</TranslateGrid>
		);
	}
}

export const WheelChannel = WheelComponent.sync(WheelChannel_);
