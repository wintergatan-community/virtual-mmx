import React from "react";
import { noteToVibraphoneLength } from "../../core/helpers";
import { computed, observable, action } from "mobx";
import { VibraphoneComponent } from "../storeComponents";
import { VibraphoneBarStore } from "../../stores/vibraphone";
import "./Vibraphone.css";

interface VibraphoneBarProps {
	barStore: VibraphoneBarStore;
}

class VibraphoneBar_ extends VibraphoneComponent<VibraphoneBarProps> {
	componentDidMount() {
		this.channelPart.runOnNote(this.strike);
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
	@computed get height() {
		return noteToVibraphoneLength(this.props.barStore.note);
	}
	@observable hit = false;

	@action.bound strike() {
		this.hit = true;
	}
	@action.bound endStrike() {
		this.hit = false;
	}
	handlePress = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
		if (e.buttons === 1 && !this.hit) {
			this.vibraphoneChannel.triggerStrike();
			this.strike();
		}
	};

	render() {
		return (
			<g
				style={{
					transform: `translate(${this.x}px, ${-this.height / 2}px)`,
				}}
				className={this.hit ? "vibraphoneHit" : ""}
				onAnimationEnd={this.endStrike}
				onMouseDown={this.handlePress}
				onMouseOver={this.handlePress}
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
