import React from "react";
import { DrumsComponent } from "../storeComponents";
import { ForcePulse } from "../../core/helpers/pulse";
import { computed, action } from "mobx";

class HiHat_ extends DrumsComponent {
	pulse = new ForcePulse();

	componentDidMount() {
		this.hihatTimeline.addEventListener(this.animateHit);

		this.pulse.friction = 0.6;
		this.pulse.tension = 0.5;
	}

	@computed get hihatTimeline() {
		return this.app.performance.eventTimelines.performanceDrop.drums.hihat;
	}

	handlePress = () => {
		this.hihatTimeline.triggerEvent();
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
