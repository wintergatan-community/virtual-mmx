import React from "react";
import { DrumsComponent } from "../storeComponents";
import { ForcePulse } from "../vibraphone/Pulse";
import { computed, action } from "mobx";

class HiHat_ extends DrumsComponent {
	pulse = new ForcePulse();

	componentDidMount() {
		this.hihatChannel.channelPart.runOnNote(this.animateHit);

		this.pulse.friction = 0.6;
		this.pulse.tension = 0.5;
	}

	@computed get hihatChannel() {
		return this.app.player.instruments.drums.channels.hihat;
	}

	handlePress = () => {
		this.hihatChannel.triggerStrike();
		this.animateHit();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(0.1);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(59.5px, 21.5px) scale(${this.pulse.x + 1})`,
				}}
				onMouseDown={this.handlePress}
			>
				<circle
					r={19.5}
					fill="rgb(253, 227, 165)"
					stroke="rgb(209, 179, 107)"
					strokeWidth={1}
				/>
				<circle r={2.5} fill="rgb(125, 125, 125)" />
			</g>
		);
	}
}

export const HiHat = DrumsComponent.sync(HiHat_);
