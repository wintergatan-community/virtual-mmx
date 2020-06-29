import React from "react";
import { Peg } from "./Peg";
import { computed, action } from "mobx";
import { WheelComponent } from "../storeComponents";
import { ChannelPart } from "../../core/playback/channelPart";

interface ChannelPegsProps {
	channel: ChannelPart;
}

class ChannelPegs_ extends WheelComponent<ChannelPegsProps> {
	render() {
		return (
			<>
				{this.props.channel.pegs.map((pegTick) => (
					<MaybeRenderedPeg
						pegTick={pegTick}
						channel={this.props.channel}
						key={pegTick}
					/>
				))}
			</>
		);
	}
}

export const ChannelPegs = WheelComponent.sync(ChannelPegs_);

interface MaybeRenderedPegProps {
	pegTick: number;
	channel: ChannelPart;
}

class MaybeRenderedPeg_ extends WheelComponent<MaybeRenderedPegProps> {
	@computed get visible() {
		return (
			this.props.pegTick > this.wheel.visibleTopTick ||
			this.props.pegTick < this.wheel.visibleBottomTick
		);
	}
	@action.bound removePeg() {
		this.props.channel.remove(this.props.pegTick);
	}
	@computed get activeDivision() {
		return this.props.pegTick % this.wheel.ticksPerNoteSubdivision === 0;
	}

	render() {
		return this.visible ? (
			<Peg
				pegTick={this.props.pegTick}
				activeDivision={this.activeDivision}
				spawnsEvent={true}
				click={this.removePeg}
				key={this.props.pegTick}
			/>
		) : null;
	}
}

const MaybeRenderedPeg = WheelComponent.sync(MaybeRenderedPeg_);
