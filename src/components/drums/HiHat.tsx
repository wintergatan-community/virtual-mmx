import { SpringPulse } from "../../core/helpers/springPulse";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const HiHat = () => {
	const app = useContext(AppContext);

	const pulse = new SpringPulse();
	const hihatTimelines = app.jointTimelines.drums.hihat;

	hihatTimelines.addJointEventListener(animateHit);

	pulse.damping = 20;
	pulse.stiffness = 300;

	function handlePress() {
		hihatTimelines.performance.triggerEvent();
		animateHit();
	}

	function animateHit() {
		pulse.applyCollision(1);
	}

	return (
		<g
			style={{
				transform: `translate(59.5px, 21.5px) scale(${pulse.value + 1})`,
				cursor: "pointer",
			}}
			onMouseDown={handlePress}
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
};
