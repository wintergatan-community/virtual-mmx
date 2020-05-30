import React from "react";
import { range, arrToPolyLine } from "../../core/helpers";
import { observer, useLocalStore } from "mobx-react";

interface GearSideProps {
	x: number;
}

export const GearSide = observer(({ x }: GearSideProps) => {
	const segs = range(0, 30, 1);
	return (
		<g style={{ transform: `translateX(${x}px)` }}>
			{segs.map((s, i) => (
				<GearSideSegment n={s} key={i} />
			))}
		</g>
	);
});

interface GearSideSegmentProps {
	n: number;
}

// TODO MobXify, too lazy rn
export const GearSideSegment = observer((props: GearSideSegmentProps) => {
	const store = useLocalStore(
		(source) => ({
			get y() {
				return source.n * 35;
			},
			get points1() {
				return arrToPolyLine([
					[0, 0],
					[3, 10],
					[17, 10],
					[20, 0],
				]);
			},
			get points2() {
				return arrToPolyLine([
					[3, 25],
					[0, 35],
					[20, 35],
					[17, 25],
				]);
			},
			get points3() {
				return arrToPolyLine([
					[0, 0],
					[0, 35],
					[3, 25],
					[3, 10],
				]);
			},
			get points4() {
				return arrToPolyLine([
					[20, 0],
					[20, 35],
					[17, 25],
					[17, 10],
				]);
			},
		}),
		props
	);

	return (
		<g style={{ transform: `translateY(${store.y}px)` }}>
			<polyline fill="#d7ba89" stroke="#d7ba89" points={store.points1} />
			<rect
				x={3}
				y={10}
				width={14}
				height={15}
				fill="#c9af83"
				stroke="#c9af83"
			/>
			<polyline fill="#bfa982" stroke="#bfa982" points={store.points2} />
			<polyline fill="#b09c78" stroke="#b09c78" points={store.points3} />
			<polyline
				fill="hsl(38, 49%, 69%)"
				stroke="hsl(38, 49%, 69%)"
				points={store.points4}
			/>
		</g>
	);
});
