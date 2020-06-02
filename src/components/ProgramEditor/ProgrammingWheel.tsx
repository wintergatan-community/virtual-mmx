import { useStores } from "../../contexts/StoreContext";
import React, { createRef } from "react";
import { ProgramGrid } from "./ProgramGrid";
import { PegPlacer } from "./PegPlacer";
import { Blur } from "./Blur";
import { observer, useLocalStore } from "mobx-react";
import { TranslateGrid } from "../TranslateGrid";

export const ProgrammingWheel = observer(() => {
	const { wheel } = useStores();
	const store = useLocalStore(() => ({
		svgRef: createRef<SVGSVGElement>(),

		handleMouseMove(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
			if (!store.svgRef.current) return;
			const svgBound = store.svgRef.current.getBoundingClientRect();
			const x = e.clientX - svgBound.left;
			const mouseChannel = wheel.pixelToChannel(x);
			const y = e.clientY - svgBound.top;
			const mouseTick = wheel.pixelToTick(y) + wheel.visibleTopTick;
			wheel.moveMouse(mouseTick, mouseChannel);
		},
		handleScroll(e: React.WheelEvent<SVGSVGElement>) {
			if (e.shiftKey) {
				wheel.zoom(e.deltaY / 20);
			} else {
				wheel.scroll(e.deltaY / 5);
			}
		},
		get seemlessWheelOffset() {
			return wheel.tickToPixel(wheel.totalTicks);
		},
	}));

	return (
		<svg
			viewBox={`0 0 ${wheel.visiblePixelWidth} ${wheel.visiblePixelHeight}`}
			style={{
				width: wheel.visiblePixelWidth,
				height: wheel.visiblePixelHeight,
			}}
			onMouseMove={store.handleMouseMove}
			onWheel={store.handleScroll}
			ref={store.svgRef}
		>
			<TranslateGrid tick={-wheel.visibleTopTick}>
				<MovingWindow />
				<TranslateGrid tick={wheel.totalTicks}>
					{/* second MovingWindow for seemless scroll */}
					<MovingWindow />
				</TranslateGrid>
			</TranslateGrid>
			<Blur />
		</svg>
	);
});

function MovingWindow() {
	const { wheel } = useStores();
	return (
		<>
			<ProgramGrid />
			<PegPlacer />
			{/* <SubdivisonChooser /> */}
			{
				wheel.showEmpties ? null : null // TODO, add this thing
			}
			{/* <GearSide x={0} />
			<GearSide x={wheel.visiblePixelWidth - 20} /> */}
			<line x1={0} y1={0} x2={wheel.visiblePixelWidth} y2={0} stroke="red" />
		</>
	);
}
