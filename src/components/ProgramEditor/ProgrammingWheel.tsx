import React, { createRef } from "react";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import { TranslateGrid } from "./TranslateGrid";
import { SubdivisonChooser } from "./SubdivisionChooser";
import { Blur } from "./Blur";
import { ProgramGrid } from "./ProgramGrid";
import { PegPlacer } from "./PegPlacer";
import { PlaybackHead } from "./PlaybackHead";
import { GearSide } from "./GearSide";

export const ProgrammingWheel = observer(() => {
	const { wheel } = useStores();
	const store = useLocalStore(() => ({
		svgRef: createRef<SVGSVGElement>(),

		handleMouseMove(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
			if (!store.svgRef.current) return;
			const svgBound = store.svgRef.current.getBoundingClientRect();
			const x = e.clientX - svgBound.left - wheel.gearWidth;
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
			viewBox={`0 0 ${wheel.visiblePixelWidth + wheel.gearWidth * 2} ${
				wheel.visiblePixelHeight
			}`}
			style={{
				width: wheel.visiblePixelWidth + wheel.gearWidth * 2,
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
			<g style={{ transform: `translateX(${wheel.gearWidth}px)` }}>
				{wheel.partDatas.map((partData, channel) => (
					<TranslateGrid channel={channel} key={channel}>
						<TextThing tuning={partData.tuning} />
					</TranslateGrid>
				))}
			</g>
			<SubdivisonChooser />
			<Blur />
		</svg>
	);
});

function MovingWindow() {
	const { wheel } = useStores();
	return (
		<>
			<g style={{ transform: `translateX(${wheel.gearWidth}px)` }}>
				<ProgramGrid />
				<PegPlacer />
				<PlaybackHead />
				<line x1={0} y1={0} x2={wheel.visiblePixelWidth} y2={0} stroke="red" />
			</g>
			<GearSide x={0} />
			<GearSide x={wheel.visiblePixelWidth + wheel.gearWidth} />
		</>
	);
}

interface TextThingProps {
	tuning: string;
}

function TextThing(props: TextThingProps) {
	return (
		<>
			<TranslateGrid channel={0.5}>
				<rect x={-17.5} y={7} width={35} height={22} fill="#444" rx={7} />
				<text
					style={{ userSelect: "none" }}
					x={0}
					y={20}
					textAnchor="middle"
					dominantBaseline="middle"
					fill="white"
				>
					{props.tuning}
				</text>
			</TranslateGrid>
		</>
	);
}
