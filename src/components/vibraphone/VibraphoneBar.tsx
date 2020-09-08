import { noteToVibraphoneLength } from "../../core/helpers/functions";
import { VibraphoneBarStore } from "../../stores/vibraphone";
import { SpringPulse } from "../../core/helpers/springPulse";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";
import { VibraphoneContext } from "./Vibraphone";

interface VibraphoneBarProps {
	barStore: VibraphoneBarStore;
}

export const VibraphoneBar = (props: VibraphoneBarProps) => {
	const { vibra } = useContext(VibraphoneContext);
	const app = useContext(AppContext);
	const pulse = new SpringPulse();
	const vibraphoneTimelines = app.jointTimelines.vibraphone[props.barStore.bar];

	vibraphoneTimelines.addJointEventListener(animateHit);
	pulse.damping = 8;
	pulse.stiffness = 100;
	// TODO disposer?

	const x = () => vibra.noteWidth * (props.barStore.bar - 1);
	const y = () => -height() / 2 + pulse.value;
	const height = () => noteToVibraphoneLength(props.barStore.note);

	function handlePress(e: MouseEvent) {
		if (e.buttons === 1) {
			vibraphoneTimelines.performance.triggerEvent();
			animateHit();
		}
	}

	function animateHit() {
		pulse.applyCollision(90);
	}

	return (
		<g
			transform={`translate(${x()}, ${y()})`}
			onMouseDown={handlePress}
			onMouseEnter={handlePress}
			id="vibraphoneBar"
			y={pulse.value}
		>
			<rect
				width={vibra.noteWidthPadded}
				height={height()}
				fill="rgb(225, 225, 225)"
				rx={4}
				stroke="rgb(210, 210, 210)"
			/>
			<text
				x={vibra.noteWidthPadded / 2}
				y={height() / 2}
				fill="rgb(130, 130, 130)"
				fontSize={16}
				textAnchor="middle"
				alignmentBaseline="central"
				style={{ "user-select": "none" }}
			>
				{props.barStore.note}
			</text>
		</g>
	);
};
