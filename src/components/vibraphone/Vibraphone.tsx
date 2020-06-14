import React, { Component } from "react";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import PartData from "../../core/playback/partData";
import { noteToVibraphoneLength } from "../../core/helpers";
import "./Vibraphone.css";
import { computed, observable, action } from "mobx";

const wholeWidth = 400;
const noteWidth = wholeWidth / 11;
const noteWidthPadded = noteWidth * 0.9;

export const Vibraphone = observer(() => {
	const { global } = useStores();
	const store = useLocalStore(() => ({
		get height() {
			return 160;
		},
		get notes() {
			return [];
		},
		get parts() {
			return Object.entries(global.player.instruments.vibraphone.parts);
		},
	}));
	return (
		<svg
			viewBox={`0 0 ${wholeWidth} ${store.height}`}
			style={{
				width: wholeWidth,
				height: store.height,
				border: "1px red solid",
			}}
		>
			<g style={{ transform: `translateY(${store.height / 2}px)` }}>
				{store.parts.map(([channel, part]) => (
					<VibraphoneNote
						part={part}
						channel={parseInt(channel)}
						key={channel}
					/>
				))}
			</g>
		</svg>
	);
});

interface VibraphoneNoteProps {
	part: PartData;
	channel: number;
}

@observer
class VibraphoneNote extends Component<VibraphoneNoteProps> {
	componentDidMount() {
		this.props.part.runOnNote(this.strike);
	}
	@computed get x() {
		return noteWidth * (this.props.channel - 1);
	}
	@computed get height() {
		return noteToVibraphoneLength(this.props.part.tuning);
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
					width={noteWidthPadded}
					height={this.height}
					fill="rgb(225, 225, 225)"
					rx={4}
					stroke="rgb(210, 210, 210)"
				/>
				<text
					x={noteWidthPadded / 2}
					y={this.height / 2}
					fill="rgb(130, 130, 130)"
					fontSize={16}
					textAnchor="middle"
					alignmentBaseline="central"
					style={{ userSelect: "none" }}
				>
					{this.props.part.tuning}
				</text>
			</g>
		);
	}
}
