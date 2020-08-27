import { ProgramGrid } from "./ProgramGrid";
import { PegPlacer } from "./PegPlacer";
import { PlaybackHead } from "./PlaybackHead";
import { ProgrammingWheelDisplayStore } from "./programmingWheelDisplay";
import { GearSide } from "./GearSide";
import { BottomBar } from "./bottomBar/BottomBar";
import { useContext, createContext } from "solid-js";
import { AppContext } from "../../stores/app";
import { ScrollContainerStore } from "../scrollContainerStore";
import { MouseTracker } from "../../core/helpers/MouseTracker";
import { ScrollBody } from "../Scroll";
import { signal } from "../../core/helpers/solid";
import { mapValue } from "../../core/helpers/functions";
import ResizeObserver from "resize-observer-polyfill";

export const ProgrammingWheelContext = createContext<{
	wheel: ProgrammingWheelDisplayStore;
	scroll: ScrollContainerStore;
	mouse: MouseTracker;
}>();

export const ProgrammingWheel = () => {
	const app = useContext(AppContext);

	const pixelsPerTick = signal(0.2);
	const mouse = new MouseTracker();
	const wheel = new ProgrammingWheelDisplayStore(app);
	const scroll = new ScrollContainerStore({
		x: {
			pixelsPerUnit: () =>
				wheel.visiblePixelWidth() / wheel.instrumentChannels().length,
			visiblePixelRange: wheel.visiblePixelWidth,
		},
		y: {
			pixelsPerUnit: pixelsPerTick,
			visiblePixelRange: wheel.visiblePixelHeight,
			total: wheel.totalTicks,
		},
		circular: true,
	});
	// const scrollSpring = new SpringPulse();
	mouse.scale({
		x: scroll.x.fromPixel,
		y: (v) => scroll.y.fromPixel(v) + scroll.y.visibleLeast(),
	});

	// scrollSpring.damping = 30;
	// scrollSpring.stiffness = 300;

	function handleScroll(e: WheelEvent) {
		if (e.shiftKey) {
			const factor = mapValue(e.deltaY, -10, 10, 1.1, 0.9);
			scroll.y.zoom(factor, mouse.mousePos()?.y ?? 0);
		} else {
			scroll.y.scroll(e.deltaY);
		}
		mouse.forceUpdate(e);
	}

	let mouseRef!: SVGSVGElement;
	const jsx = (
		<ProgrammingWheelContext.Provider value={{ wheel, scroll, mouse }}>
			<div
				style={{
					display: "grid",
					width: "100%",
					height: "100%",
					"place-items": "center",
				}}
			>
				<div
					style={{
						display: "grid",
						height: "90%",
						width: "90%",
						"grid-template-rows": "1fr 12fr 1fr",
					}}
				>
					<div style={{ background: "#ccc" }}></div>
					<div
						style={{ display: "grid", "grid-template-columns": "1fr 18fr 1fr" }}
					>
						<GearSide />
						<svg
							style={{ width: "100%", height: "100%" }}
							onWheel={handleScroll}
							ref={mouseRef}
						>
							<MovingWindow />
						</svg>
						<GearSide />
					</div>
					<BottomBar />
				</div>
			</div>
		</ProgrammingWheelContext.Provider>
	);

	mouse.setElement(mouseRef);
	new ResizeObserver(() => {
		// this API sucks and doesn't work right
		const box = mouseRef.getBoundingClientRect();
		wheel.visiblePixelWidth(box.width);
		wheel.visiblePixelHeight(box.height);
	}).observe(mouseRef);

	return jsx;
};

const MovingWindow = () => {
	const { scroll } = useContext(ProgrammingWheelContext);

	return (
		<ScrollBody scroll={scroll}>
			<ProgramGrid />
			<PegPlacer />
			<PlaybackHead />
			<line
				x1={0}
				y1={0}
				x2={scroll.x.visiblePixelRange()}
				y2={0}
				stroke="red"
			/>
		</ScrollBody>
	);
};
