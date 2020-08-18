import React from "react";
import { computed, action } from "mobx";
import { AppComponent } from "../storeComponents";

class TransportControls_ extends AppComponent {
	@computed get player() {
		return this.app.player;
	}
	@action.bound togglePlay() {
		if (this.player.running) {
			this.player.pause();
		} else {
			this.player.play();
		}
	}
	render() {
		return (
			<div
				style={{
					backgroundColor: "rgb(225, 225, 225)",
					// border: "1px solid rgb(195, 195, 195)",
					borderRadius: 10,
					width: "92%",
					height: "92%",
					padding: 10,
				}}
			>
				<div
					style={{
						display: "flex",
						backgroundColor: "#ccccccff",
						borderRadius: 8,
						padding: 5,
					}}
				>
					<div
						style={{
							display: "flex",
							width: 35,
							height: 35,
							backgroundColor: this.player.running ? "#93c47d" : "#b7b7b7",
							borderRadius: 6,
							margin: 2,
							cursor: "pointer",
							transition: "0.2s",
							userSelect: "none",
						}}
						onClick={this.togglePlay}
					>
						{this.player.running ? <PauseIcon /> : <PlayIcon />}
					</div>
					<div
						style={{
							display: "flex",
							width: 35,
							height: 35,
							backgroundColor: "#b7b7b7",
							borderRadius: 6,
							margin: 2,
							cursor: "pointer",
							userSelect: "none",
						}}
						onClick={this.player.restart}
					>
						<RestartIcon />
					</div>
				</div>
			</div>
		);
	}
}

export const TransportControls = AppComponent.sync(TransportControls_);

function PlayIcon() {
	return (
		<svg viewBox="-50 -50 100 100" style={{ width: "100%", height: "100%" }}>
			<polygon
				points={"20,0 -20,21 -20,-21"}
				strokeWidth={12}
				stroke="#666"
				fill="#666"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function PauseIcon() {
	return (
		<svg viewBox="-50 -50 100 100" style={{ width: "100%", height: "100%" }}>
			<rect x={7} y={-25} width={18} height={50} rx={5} fill="#609947" />
			<rect x={-27} y={-25} width={18} height={50} rx={5} fill="#609947" />
		</svg>
	);
}

function RestartIcon() {
	function Arrow(props: { x: number }) {
		return (
			<g transform={`translate(${props.x}, 0)`}>
				<polygon
					points={"-8,0 8,18 8,-18"}
					strokeWidth={12}
					stroke="#666"
					fill="#666"
					strokeLinejoin="round"
				/>
			</g>
		);
	}
	return (
		<svg viewBox="-50 -50 100 100" style={{ width: "100%", height: "100%" }}>
			<Arrow x={-18} />
			<Arrow x={18} />
		</svg>
	);
}
