import React, { useContext } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { mapValue } from "../../core/helpers";

interface MarbleSlotProps {
	tick: number;
	channel: number;
	activeDivision: boolean;
	click: () => void;
}

export default function Peg({
	tick,
	channel,
	activeDivision,
	click,
}: MarbleSlotProps) {
	const {
		tickToPixel,
		channelToPixel,
		subdivisionChecker,
		noteSubdivision,
	} = useContext(EditorContext);
	const x = channelToPixel(channel);
	const y = tickToPixel(tick);
	const w = 10;
	const h = Math.min(20, Math.max(tickToPixel(noteSubdivision) - 5, 5));
	const shift = mapValue(
		subdivisionChecker(tick),
		0,
		1,
		0,
		channelToPixel(1) - w
	); //channelToPixel(1) / 2 - w/2

	return (
		<g style={{ transform: `translate(${x}px, ${y}px)` }}>
			<rect
				width={w}
				height={h}
				fill={activeDivision ? "#ccc" : "#ccc9"}
				x={shift} //channelToPixel(1) / 2 - w/2 +
				rx={3}
				onClick={click}
			/>
		</g>
	);
}
