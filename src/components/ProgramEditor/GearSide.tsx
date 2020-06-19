import React from "react";
import { range, arrToPolyLine } from "../../core/helpers";
import { observer, useLocalStore } from "mobx-react";
import { TranslateGrid } from "./TranslateGrid";
import { useStores } from "../../contexts/StoreContext";

interface GearSideProps {
	x: number;
}

// TODO needs major optimization and better structure
export const GearSide = observer((props: GearSideProps) => {
	const { wheel, global } = useStores();

	const store = useLocalStore(() => ({
		get repeat() {
			return global.tpq * 2;
		},
		get segments() {
			return range(0, wheel.totalTicks, store.repeat);
		},
		get scale() {
			return wheel.tickToPixel(store.repeat);
		},
		w(n: number) {
			return n * wheel.gearWidth;
		},
		h(n: number) {
			return n * store.scale;
		},
		scaledPoints(arr: number[][]) {
			return arr.map((a) => [store.w(a[0]), store.h(a[1])]);
		},
		get points1() {
			return arrToPolyLine(
				store.scaledPoints([
					[0, 0],
					[0.1, 0.3],
					[0.9, 0.3],
					[1, 0],
				])
			);
		},
		get points2() {
			return arrToPolyLine(
				store.scaledPoints([
					[0.1, 0.7],
					[0, 1],
					[1, 1],
					[0.9, 0.7],
				])
			);
		},
		get points3() {
			return arrToPolyLine(
				store.scaledPoints([
					[0, 0],
					[0, 1],
					[0.1, 0.7],
					[0.1, 0.3],
				])
			);
		},
		get points4() {
			return arrToPolyLine(
				store.scaledPoints([
					[1, 0],
					[1, 1],
					[0.9, 0.7],
					[0.9, 0.3],
				])
			);
		},
		get rectBits() {
			return store.scaledPoints([
				[0.1, 0.3],
				[0.8, 0.5],
			]);
		},
	}));

	return (
		<g style={{ transform: `translateX(${props.x}px)` }}>
			{store.segments.map((tick, i) => (
				<TranslateGrid tick={tick} key={i}>
					<polyline fill="#d7ba89" stroke="#d7ba89" points={store.points1} />
					<rect
						x={store.rectBits[0][0]}
						y={store.rectBits[0][1]}
						width={store.rectBits[1][0]}
						height={store.rectBits[1][1]}
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
				</TranslateGrid>
			))}
		</g>
	);
});

// export const GearSideSegment = observer(() => {
// 	return (
// 		<g>
// 			<polyline fill="#d7ba89" stroke="#d7ba89" points={store.points1} />
// 			<rect
// 				x={3}
// 				y={10}
// 				width={14}
// 				height={15}
// 				fill="#c9af83"
// 				stroke="#c9af83"
// 			/>
// 			<polyline fill="#bfa982" stroke="#bfa982" points={store.points2} />
// 			<polyline fill="#b09c78" stroke="#b09c78" points={store.points3} />
// 			<polyline
// 				fill="hsl(38, 49%, 69%)"
// 				stroke="hsl(38, 49%, 69%)"
// 				points={store.points4}
// 			/>
// 		</g>
// 	);
// });
