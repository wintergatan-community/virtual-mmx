import { mapValue } from "../../core/helpers/functions";
import { SpringPulse } from "../../core/helpers/springPulse";
import { createEffect } from "solid-js";
import { Signal } from "../../core/helpers/solid";

interface GroupLeverProps {
	offset: number;
	char: string;
	muted: Signal<boolean | undefined>;
}

export const GroupLever = (props: GroupLeverProps) => {
	const flipSpring = new SpringPulse();
	// config={{ tension: 700, friction: 50 }}
	flipSpring.damping = 50;
	flipSpring.stiffness = 500;
	flipSpring.snapTo(30);

	const x = () => {
		const pad = 60;
		// TODO move to local provider
		return mapValue(props.offset, 0, 5, pad, 300 - pad) - 150;
	};

	function handleToggle() {
		props.muted(!props.muted());
		const amp = 30;
		const y = props.muted() ? -amp : amp;
		flipSpring.moveTo(y);
	}

	return (
		<g
			transform={`translate(${x()}, 0)`}
			onClick={handleToggle}
			onMouseEnter={(e) => e.buttons === 1 && handleToggle()}
			style={{ cursor: "pointer" }}
		>
			<rect x={-6} y={-10} width={12} height={20} fill="rgb(114, 114, 114)" />
			<line
				y1={flipSpring.value / 10}
				y2={flipSpring.value}
				stroke="rgb(175, 175, 175)"
				strokeWidth={4}
			/>
			<circle cy={flipSpring.value} r={12} fill="rgb(47, 47, 47)" />
			<text
				y={flipSpring.value + 6}
				fontSize={18}
				textAnchor="middle"
				fill="rgb(215, 215, 215)"
				style={{ "user-select": "none" }}
			>
				{props.char}
			</text>
		</g>
	);
};
