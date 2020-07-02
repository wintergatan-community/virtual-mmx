import React from "react";
import { computed, action } from "mobx";
import { AppComponent } from "../storeComponents";

import pauseIcon from "./transportIcons/pause.png";
import playIcon from "./transportIcons/play.png";
import restartIcon from "./transportIcons/restart.png";

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
					display: "flex",
					width: 154,
					height: 127,
					backgroundColor: "rgb(225, 225, 225)",
					borderRadius: 5,
					border: "1px solid rgb(195, 195, 195)",
					padding: 2,
				}}
			>
				<div
					style={{
						display: "flex",
						width: 24,
						height: 24,
						backgroundColor: this.player.running ? "#CD0000" : "#4169e1",
						borderRadius: 3,
						margin: 2,
						cursor: "pointer",
						transition: "0.2s",
					}}
					onClick={this.togglePlay}
				>
					<img
						src={this.player.running ? pauseIcon : playIcon}
						style={{ width: "100%", height: "100%" }}
					/>
				</div>
				<div
					style={{
						display: "flex",
						width: 24,
						height: 24,
						backgroundColor: "orange",
						borderRadius: 3,
						margin: 2,
						cursor: "pointer",
					}}
					onClick={this.player.restart}
				>
					<img src={restartIcon} style={{ width: "100%", height: "100%" }} />
				</div>
			</div>
		);
	}
}

export const TransportControls = AppComponent.sync(TransportControls_);
