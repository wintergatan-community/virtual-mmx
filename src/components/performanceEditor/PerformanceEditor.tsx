import { TimelineTabs } from "./TimelineTab";
import { SpringPulse } from "../../core/helpers/springPulse";
import { createContext, createDependentEffect } from "solid-js";
import { ScrollContainerStore } from "../scrollContainerStore";
import { PerformanceEditorStore } from "./performanceEditorStore";
import { ScrollableTimeline } from "./ScrollableTimeline";
import { signal } from "../../core/helpers/solid";

export const PerformanceEditorContext = createContext<{
	perf: PerformanceEditorStore;
	scroll: ScrollContainerStore;
}>();

export const PerformanceEditor = () => {
	const perf = new PerformanceEditorStore();
	const scroll = new ScrollContainerStore({
		x: {
			pixelsPerUnit: signal(1),
			visiblePixelRange: signal(500),
		},
	});
	const showSpring = new SpringPulse();

	showSpring.damping = 50;
	showSpring.stiffness = 300;
	showSpring.snapTo(130);

	createDependentEffect(() => {
		showSpring.moveTo(perf.open() ? 0 : 130);
	}, [perf.open]);

	return (
		<PerformanceEditorContext.Provider value={{ perf, scroll }}>
			<div
				style={{
					position: "absolute",
					width: "100%",
					bottom: "0px",
					transform: `translateY(${showSpring.value}px)`,
				}}
			>
				<TimelineTabs />
				<ScrollableTimeline />
			</div>
		</PerformanceEditorContext.Provider>
	);
};
