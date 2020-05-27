import React from "react";
import { range, arrToPolyLine } from "../../core/helpers";

interface GearSideProps {
	x: number;
}

export function GearSide({ x }: GearSideProps) {
	const segs = range(0, 30, 1);
	return (
		<g style={{ transform: `translateX(${x}px)` }}>
			{segs.map((s, i) => (
				<GearSideSegment n={s} key={i} />
			))}
		</g>
	);
}

interface GearSideSegmentProps {
	n: number;
}

function GearSideSegment({ n }: GearSideSegmentProps) {
	return (
		<g style={{ transform: `translateY(${n * 35}px)` }}>
			<polyline
				fill="#d7ba89"
				stroke="#d7ba89"
				points={arrToPolyLine([
					[0, 0],
					[3, 10],
					[17, 10],
					[20, 0],
				])}
			/>
			<rect
				x={3}
				y={10}
				width={14}
				height={15}
				fill="#c9af83"
				stroke="#c9af83"
			/>
			<polyline
				fill="#bfa982"
				stroke="#bfa982"
				points={arrToPolyLine([
					[3, 25],
					[0, 35],
					[20, 35],
					[17, 25],
				])}
			/>
			<polyline
				fill="#b09c78"
				stroke="#b09c78"
				points={arrToPolyLine([
					[0, 0],
					[0, 35],
					[3, 25],
					[3, 10],
				])}
			/>
			<polyline
				fill="hsl(38, 49%, 69%)"
				stroke="hsl(38, 49%, 69%)"
				points={arrToPolyLine([
					[20, 0],
					[20, 35],
					[17, 25],
					[17, 10],
				])}
			/>
		</g>
	);
}
