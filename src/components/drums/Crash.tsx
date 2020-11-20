import { SpringPulse } from "../../core/helpers/springPulse";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const Crash = () => {
	const app = useContext(AppContext);

	const pulse = new SpringPulse();
	const crashTimelines = app.jointTimelines.drums.crash;

	crashTimelines.addJointEventListener(animateHit);
	pulse.damping = 15;
	pulse.stiffness = 500;

	function handlePress() {
		crashTimelines.performance.triggerEvent();
		animateHit();
	}

	function animateHit() {
		pulse.applyCollision(120);
	}

	return (
		<g
			style={{
				transform: `translate(50px, 91px) rotate(${pulse.value}deg)`,
				cursor: 'pointer'
			}}
			onMouseDown={handlePress}
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
};
