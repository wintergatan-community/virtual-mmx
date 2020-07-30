import React, { Component } from "react";
import { AppComponent } from "../storeComponents";
import { computed } from "mobx";

class TimeEditor_ extends AppComponent {
	@computed get height() {
		return 180;
	}
	@computed get tick() {
		return this.app.player.currentTick;
	}
	@computed get pegs() {
		return this.app.performance.program.dropEventTimelines.vibraphone[1].events;
	}

	render() {
		return (
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: this.height,
					backgroundColor: "black",
					bottom: 0,
				}}
			>
				<svg style={{ width: "100%", height: "100%" }}>
					<line
						x1={this.tick}
						x2={this.tick}
						y2={this.height}
						stroke="red"
						strokeWidth={2}
					/>
					{this.pegs.map((_, peg) => (
						<line
							x1={peg}
							x2={peg}
							y2={this.height}
							stroke="green"
							strokeWidth={2}
							key={peg}
						/>
					))}
					<Segment start={20} end={50} color="purple" />
				</svg>
			</div>
		);
	}
}

export const TimeEditor = AppComponent.sync(TimeEditor_);

interface SegmentProps {
	start: number;
	end: number;
	color: string;
}

class Segment extends Component<SegmentProps> {
	render() {
		return (
			<g>
				<line
					x1={this.props.start}
					x2={this.props.end}
					y1={10}
					y2={10}
					stroke={this.props.color}
					strokeWidth={3}
				/>
				<circle cx={this.props.start} cy={10} fill={this.props.color} r={5} />
				<circle cx={this.props.end} cy={10} fill={this.props.color} r={5} />
			</g>
		);
	}
}
