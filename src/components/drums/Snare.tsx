import React from "react";
import { DrumsComponent } from "../storeComponents";
import { ForcePulse } from "../vibraphone/Pulse";
import { computed, action } from "mobx";

class Snare_ extends DrumsComponent {
	pulse = new ForcePulse();

	componentDidMount() {
		this.snareChannel.channelPart.runOnNote(this.animateHit);

		this.pulse.friction = 0.6;
		this.pulse.tension = 0.5;
	}

	@computed get snareChannel() {
		return this.app.player.instruments.drums.channels.snare;
	}

	handlePress = () => {
		this.snareChannel.triggerStrike();
		this.animateHit();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(0.1);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(53px, 57px) scale(${this.pulse.x + 1})`,
				}}
				onMouseDown={this.handlePress}
			>
				<circle r={24} fill="rgb(144, 144, 144)" />
				<circle r={22} fill="rgb(51, 51, 51)" />
				<circle r={16.5} fill="rgb(247, 247, 247)" />
			</g>
		);
	}
}

export const Snare = DrumsComponent.sync(Snare_);
