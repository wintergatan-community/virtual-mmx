import React from "react";
import { Peg } from "./Peg";
import { computed, action } from "mobx";
import { WheelComponent } from "../storeComponents";
import {
	VibraphoneDropE,
	DropEventTimeline,
	DropE,
} from "../../core/eventTimelines/concrete";

interface ChannelPegsProps {
	timeline: DropEventTimeline<VibraphoneDropE>; // TODO not "any"?
}

class ChannelPegs_ extends WheelComponent<ChannelPegsProps> {
	render() {
		return (
			<>
				{this.props.timeline.events.map((peg) => (
					<MaybeRenderedPeg
						pegTick={peg.tick}
						timeline={this.props.timeline}
						key={peg.tick}
					/>
				))}
			</>
		);
	}
}

export const ChannelPegs = WheelComponent.sync(ChannelPegs_);

interface MaybeRenderedPegProps {
	pegTick: number;
	timeline: DropEventTimeline<DropE>;
}

class MaybeRenderedPeg_ extends WheelComponent<MaybeRenderedPegProps> {
	@computed get visible() {
		return (
			this.props.pegTick > this.wheel.visibleTopTick ||
			this.props.pegTick < this.wheel.visibleBottomTick
		);
	}
	@action.bound removePeg() {
		const t = this.props.timeline;
		const event = t.events.find((e) => e.tick === this.props.pegTick);
		if (!event) return;
		const difs = t.getRemoveDifs(event);
		if (!difs) return;
		t.applyDifs(difs);
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
