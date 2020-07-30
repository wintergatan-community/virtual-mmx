import React from "react";
import { DrumsComponent } from "../storeComponents";
import { computed, action } from "mobx";
import { ForcePulse } from "../../core/helpers/pulse";

class Bassdrum_ extends DrumsComponent {
	pulse = new ForcePulse();

	componentDidMount() {
		this.bassdrumTimelines.addJointEventListener(this.animateHit);

		this.pulse.friction = 0.6;
		this.pulse.tension = 0.5;
	}

	@computed get bassdrumTimelines() {
		return this.app.jointTimelines.drums.bassdrum;
	}

	handlePress = () => {
		this.bassdrumTimelines.performance.triggerEvent();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(0.1);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(27.3px, 35.3px) scale(${this.pulse.x + 1})`,
				}}
				onMouseDown={this.handlePress}
			>
				<circle r={12} fill="rgb(195, 195, 195)" />
				<circle r={10} fill="rgb(247, 247, 247)" />
				<circle r={1.6} fill="rgb(99, 99, 99)" />
			</g>
		);
	}
}

export const Bassdrum = DrumsComponent.sync(Bassdrum_);
