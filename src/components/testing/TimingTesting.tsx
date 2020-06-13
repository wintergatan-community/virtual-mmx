import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import { range } from "../../core/helpers";
import { Transport, Synth } from "tone";

interface TPSChange {
	tick: number;
	endTick: number;
	endTPS: number;
}

let synth = new Synth().toDestination();

Transport.bpm.value = 1 * 60;
Transport.PPQ = 1;

// Transport.schedule((time) => {
// 	synth.triggerAttackRelease("C4", "1i", time);
// }, "10i");

window.onclick = () => {
	Transport.position = 0;
	Transport.start();
};

const startTPS = 1;
const pixelsPerSecond = 1;
const tpsChanges: TPSChange[] = [
	{
		tick: 0,
		endTick: 0,
		endTPS: 1,
	},
	{
		tick: 30,
		endTick: 50,
		endTPS: 2,
	},
	{
		tick: 80,
		endTick: 90,
		endTPS: 1,
	},
];

const res = [
	{
		tick: 0,
		timeStart: 0,
		tpsStart: 1,
		rate: 0,
	},
	{
		// xf = 50, xi = 30, vi = 1, vf = 2
		tick: 30,
		timeStart: 30, // dependant on above ^
		tpsStart: 1,
	},
	{
		tick: 50,
	},
	{
		tick: 80,
	},
	{
		tick: 90,
	},
];

@observer
export class TimingTesting extends Component {
	tpq = 240;
	interval: NodeJS.Timeout | undefined;
	@observable currentTick = 0;
	@observable markerTicks = range(0, 100, 5);

	componentDidMount() {
		this.interval = setInterval(() => this.updateTick(), 10);
	}

	@action updateTick() {
		this.currentTick = Transport.ticks;
	}

	@action suspend = () => {
		this.interval ?? clearInterval(this.interval);
	};

	render() {
		return (
			<svg viewBox="0 0 100 100" style={{ height: 800, width: 800 }}>
				{this.markerTicks.map((t) => (
					<Line tick={t} key={t} />
				))}
				<Line tick={this.currentTick} color="#f0f" />
				<rect width={100} height={100} stroke="gray" fill="none" />
			</svg>
		);
	}
}

function Line({ tick, color }: { tick: number; color?: string }) {
	const time = tick * 1; //tickToTime(tick);
	return (
		<g
			style={{
				transform: `translateX(${time / pixelsPerSecond}px)`,
			}}
		>
			<text y={97} fontSize={1.2} textAnchor="middle" fill={color ?? "black"}>
				{time.toFixed(2) + "s"}
			</text>
			<text y={98.5} fontSize={1.1} textAnchor="middle" fill={color ?? "black"}>
				{tick + "t"}
			</text>
			<line y2={95} stroke={color ?? "black"} strokeWidth={0.5} />
		</g>
	);
}

// function tickToTime(checkTick: number) {
// 	let totalSeconds = 0;
// 	let prevTick = 0;
// 	for (let tpsChange of tpsChanges) {
// 		let { tick, endTick, endTPS } = tpsChange;
// 	}
// 	return totalSeconds;
// }
