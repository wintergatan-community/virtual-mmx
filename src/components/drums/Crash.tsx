import React from "react";
import { DrumsComponent } from "../storeComponents";
import { SpringPulse } from "../../core/helpers/springPulse";
import { computed, action } from "mobx";

class Crash_ extends DrumsComponent {
	pulse = new SpringPulse();

	componentDidMount() {
		this.crashTimelines.addJointEventListener(this.animateHit);
		this.pulse.damping = 15;
		this.pulse.stiffness = 500;
	}

	@computed get crashTimelines() {
		return this.app.jointTimelines.drums.crash;
	}

	handlePress = () => {
		this.crashTimelines.performance.triggerEvent();
		this.animateHit();
	};

	@action.bound animateHit() {
		this.pulse.applyCollision(120);
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(50px, 91px) rotate(${this.pulse.value}deg)`,
				}}
				onMouseDown={this.handlePress}
			>
				<ellipse
					rx={34}
					ry={8}
					fill="rgb(253, 227, 165)"
					stroke="rgb(209, 179, 107)"
					strokeWidth={1}
				/>

				<rect
					x={-4}
					y={-2}
					width={8}
					height={4}
					rx={2}
					fill="rgb(111, 111, 111)"
				/>
			</g>
		);
	}
}
export const Crash = DrumsComponent.sync(Crash_);
