import { SpringPulse } from "../../core/helpers/springPulse";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const Snare = () => {
	const app = useContext(AppContext);

	const pulse = new SpringPulse();
	const snareTimelines = app.jointTimelines.drums.snare;

	snareTimelines.addJointEventListener(animateHit);

	pulse.damping = 20;
	pulse.stiffness = 300;

	function handlePress() {
		snareTimelines.performance.triggerEvent();
		animateHit();
	}

	function animateHit() {
		pulse.applyCollision(1);
	}

	return (
		<g
			style={{
				transform: `translate(53px, 57px) scale(${pulse.value + 1})`,
			}}
			onMouseDown={handlePress}
		>
			<circle r={24} fill="rgb(144, 144, 144)" />
			<circle r={22} fill="rgb(51, 51, 51)" />
			<circle r={16.5} fill="rgb(247, 247, 247)" />
		</g>
	);
};
