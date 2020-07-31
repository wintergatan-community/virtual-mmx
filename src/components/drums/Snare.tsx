import React from "react";
import { DrumsComponent } from "../storeComponents";
import { SpringPulse } from "../../core/helpers/springPulse";
import { computed, action } from "mobx";

class Snare_ extends DrumsComponent {
	pulse = new SpringPulse();

	componentDidMount() {
		this.snareTimelines.addJointEventListener(this.animateHit);

		this.pulse.damping = 20;
		this.pulse.stiffness = 300;
	}

	@computed get snareTimelines() {
		return this.app.jointTimelines.drums.snare;
	}

	handlePress = () => {
		this.snareTimelines.performance.triggerEvent();
		this.animateHit();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(1);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(53px, 57px) scale(${this.pulse.value + 1})`,
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
