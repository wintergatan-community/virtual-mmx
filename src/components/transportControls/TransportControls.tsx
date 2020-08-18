import React from "react";
import { computed, action, observable } from "mobx";
import { AppComponent } from "../storeComponents";
import { PlayPauseButton } from "./PlayPauseButton";
import { RestartButton } from "./RestartButton";
import { RecordButton } from "./RecordButton";

class TransportControls_ extends AppComponent {
	@observable recording = false;
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
	@action.bound toggleRecord() {
		this.recording = !this.recording;
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
					<PlayPauseButton
						togglePlay={this.togglePlay}
						running={this.player.running}
					/>
					<RecordButton
						toggleRecord={this.toggleRecord}
						recording={this.recording}
					/>
					<RestartButton restart={this.player.restart} />
				</div>
			</div>
		);
	}
}

export const TransportControls = AppComponent.sync(TransportControls_);
