import { SpringPulse } from "../../core/helpers/springPulse";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const Bassdrum = () => {
	const app = useContext(AppContext);

	const pulse = new SpringPulse();
	const bassdrumTimelines = app.jointTimelines.drums.bassdrum;

	bassdrumTimelines.addJointEventListener(animateHit);

	pulse.damping = 20;
	pulse.stiffness = 300;

	function handlePress() {
		bassdrumTimelines.performance.triggerEvent();
	}

	function animateHit() {
		pulse.applyCollision(2);
	}

	return (
		<g
			style={{
				transform: `translate(27.3px, 35.3px) scale(${pulse.value + 1})`,
				cursor: "pointer",
			}}
			onMouseDown={handlePress}
		>
			<circle r={12} fill="rgb(195, 195, 195)" />
			<circle r={10} fill="rgb(247, 247, 247)" />
			<circle r={1.6} fill="rgb(99, 99, 99)" />
		</g>
	);
};
