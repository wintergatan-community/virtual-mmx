import React from "react";
import { Peg } from "./Peg";
import { computed, action } from "mobx";
import { WheelComponent } from "../storeComponents";
import { EventTimeline } from "../../stores/app";

interface ChannelPegsProps {
	timeline: EventTimeline<any>; // TODO not "any"?
}

class ChannelPegs_ extends WheelComponent<ChannelPegsProps> {
	render() {
		return (
			<>
				{this.props.timeline.events.map((_, pegTick) => (
					<MaybeRenderedPeg
						pegTick={pegTick}
						timeline={this.props.timeline}
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
	timeline: EventTimeline<any>;
}

class MaybeRenderedPeg_ extends WheelComponent<MaybeRenderedPegProps> {
	@computed get visible() {
		return (
			this.props.pegTick > this.wheel.visibleTopTick ||
			this.props.pegTick < this.wheel.visibleBottomTick
		);
	}
	@action.bound removePeg() {
		this.props.timeline.remove(this.props.pegTick);
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
