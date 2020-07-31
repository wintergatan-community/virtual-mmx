import React from "react";
import { DrumsComponent } from "../storeComponents";
import { SpringPulse } from "../../core/helpers/springPulse";
import { computed, action } from "mobx";

class HiHat_ extends DrumsComponent {
	pulse = new SpringPulse();

	componentDidMount() {
		this.hihatTimelines.addJointEventListener(this.animateHit);

		this.pulse.damping = 20;
		this.pulse.stiffness = 300;
	}

	@computed get hihatTimelines() {
		return this.app.jointTimelines.drums.hihat;
	}

	handlePress = () => {
		this.hihatTimelines.performance.triggerEvent();
		this.animateHit();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(1);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(59.5px, 21.5px) scale(${this.pulse.value + 1})`,
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
