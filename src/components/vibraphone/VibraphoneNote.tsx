import React, { Component } from "react";
import { observer } from "mobx-react";
import { noteToVibraphoneLength } from "../../core/helpers";
import "./Vibraphone.css";
import { computed, observable, action } from "mobx";
import { vibra } from "./Vibraphone";
import { global } from "../../contexts/StoreContext";
import { VibraphoneChannel } from "vmmx-schema";

interface VibraphoneNoteProps {
	channel: VibraphoneChannel;
}

@observer
export class VibraphoneNote extends Component<VibraphoneNoteProps> {
	componentDidMount() {
		this.channelData.partData.runOnNote(this.strike);
	}

	@computed get channelData() {
		return global.player.instruments.vibraphone.channels[this.props.channel];
	}
	@computed get x() {
		return vibra.noteWidth * (this.props.channel - 1);
	}
	@computed get height() {
		return noteToVibraphoneLength(this.channelData.note);
	}
	@observable hit = false;

	@action.bound strike() {
		this.hit = true;
	}
	@action.bound endStrike() {
		this.hit = false;
	}
	handlePress = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
		if (e.buttons === 1) this.strike();
	};

	render() {
		return (
			<g
				style={{ transform: `translate(${this.x}px, ${-this.height / 2}px)` }}
				className={this.hit ? "vibraphoneHit" : ""}
				onAnimationEnd={this.endStrike}
				onMouseOver={this.handlePress}
				onMouseDown={this.handlePress}
			>
				<rect
					width={vibra.noteWidthPadded}
					height={this.height}
					fill="rgb(225, 225, 225)"
					rx={4}
					stroke="rgb(210, 210, 210)"
				/>
				<text
					x={vibra.noteWidthPadded / 2}
					y={this.height / 2}
					fill="rgb(130, 130, 130)"
					fontSize={16}
					textAnchor="middle"
					alignmentBaseline="central"
					style={{ userSelect: "none" }}
				>
					{this.channelData.note}
				</text>
			</g>
		);
	}
}
