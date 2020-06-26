import React from "react";
import Button from "react-bootstrap/Button";
import { computed, action } from "mobx";
import { AppComponent } from "../storeComponents";

class TransportControls_ extends AppComponent {
	@computed get player() {
		return this.app.player;
	}
	@action.bound handleClick() {
		if (this.player.running) {
			this.player.pause();
		} else {
			this.player.play();
		}
	}
	render() {
		return (
			<div>
				<Button onClick={this.handleClick}>
					{this.player.running ? "Pause" : "Play"}
				</Button>
				<Button onClick={this.player.restart}>Restart</Button>
			</div>
		);
	}
}

export const TransportControls = AppComponent.sync(TransportControls_);
