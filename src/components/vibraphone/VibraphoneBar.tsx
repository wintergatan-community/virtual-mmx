import React from "react";
import { noteToVibraphoneLength } from "../../core/helpers/functions";
import { computed, action } from "mobx";
import { VibraphoneComponent } from "../storeComponents";
import { VibraphoneBarStore } from "../../stores/vibraphone";
import { ForcePulse } from "./Pulse";

interface VibraphoneBarProps {
	barStore: VibraphoneBarStore;
}

class VibraphoneBar_ extends VibraphoneComponent<VibraphoneBarProps> {
	pulse = new ForcePulse();

	componentDidMount() {
		this.channelPart.runOnNote(this.animateHit);
		// TODO disposer?
	}
	@computed get vibraphoneChannel() {
		return this.app.player.instruments.vibraphone.channels[
			this.props.barStore.bar
		];
	}
	@computed get channelPart() {
		return this.vibraphoneChannel.channelPart;
	}
	@computed get x() {
		return this.vibra.noteWidth * (this.props.barStore.bar - 1);
	}
	@computed get y() {
		return -this.height / 2 + this.pulse.x;
	}
	@computed get height() {
		return noteToVibraphoneLength(this.props.barStore.note);
	}

	handlePress = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
		if (e.buttons === 1) {
			this.vibraphoneChannel.triggerStrike();
			this.animateHit();
		}
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(3);
	}

	render() {
		return (
			<g
				transform={`translate(${this.x}, ${this.y})`}
				onMouseDown={this.handlePress}
				onMouseEnter={this.handlePress}
				y={this.pulse.x}
			>
				<rect
					width={this.vibra.noteWidthPadded}
					height={this.height}
					fill="rgb(225, 225, 225)"
					rx={4}
					stroke="rgb(210, 210, 210)"
				/>
				<text
					x={this.vibra.noteWidthPadded / 2}
					y={this.height / 2}
					fill="rgb(130, 130, 130)"
					fontSize={16}
					textAnchor="middle"
					alignmentBaseline="central"
					style={{ userSelect: "none" }}
				>
					{this.props.barStore.note}
				</text>
			</g>
		);
	}
}

export const VibraphoneBar = VibraphoneComponent.sync(VibraphoneBar_);
