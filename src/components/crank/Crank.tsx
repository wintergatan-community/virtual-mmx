import React from "react";
import { AppComponent } from "../storeComponents";
import { computed } from "mobx";

class Crank_ extends AppComponent {
	width = 160;
	height = 160;

	@computed get y() {
		const tick = this.app.player.currentTick;
		const tpq = this.app.program.metadata.tpq;
		const rot = (tick / tpq) * 2 * Math.PI;

		return 10 * Math.sin(rot);
	}

	render() {
		return (
			<svg
				viewBox={`-50 -50 ${100} ${100}`}
				style={{
					width: this.width,
					height: this.height,
					border: "1px purple solid",
				}}
			>
				<rect x={-26} y={-35} width={6} height={70} fill="rgb(83, 83, 83)" />
				<rect x={-39} y={-18} width={6} height={36} fill="rgb(83, 83, 83)" />

				<g transform={`translate(0, ${this.y})`}>
					<rect
						x={-33}
						y={-3}
						width={25}
						height={6}
						fill="rgb(159, 159, 159)"
					/>
					<rect
						x={-10}
						y={-14}
						width={44}
						height={28}
						fill="rgb(184, 171, 156)"
					/>
				</g>

				<g transform="translate(15, 35)">
					<rect
						x={-30}
						y={-10}
						width={60}
						height={20}
						rx={10}
						fill="rgb(237, 237, 237)"
					/>
					<text y={4} fontSize={11} textAnchor="middle">
						{this.app.program.state.machine.bpm} BPM
					</text>
				</g>
			</svg>
		);
	}
}

export const Crank = AppComponent.sync(Crank_);
