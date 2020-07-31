import React from "react";
import { DrumsComponent } from "../storeComponents";
import { computed, action } from "mobx";
import { SpringPulse } from "../../core/helpers/springPulse";

class Bassdrum_ extends DrumsComponent {
	pulse = new SpringPulse();

	componentDidMount() {
		this.bassdrumTimelines.addJointEventListener(this.animateHit);

		this.pulse.damping = 20;
		this.pulse.stiffness = 300;
	}

	@computed get bassdrumTimelines() {
		return this.app.jointTimelines.drums.bassdrum;
	}

	handlePress = () => {
		this.bassdrumTimelines.performance.triggerEvent();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(2);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(27.3px, 35.3px) scale(${this.pulse.value + 1})`,
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
