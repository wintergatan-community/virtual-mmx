import { ScrollableTimeline } from "./ScrollableTimeline";
import { PerformanceAction } from "./other";
import { TimelineTabs } from "./TimelineTab";
import { SpringPulse } from "../../core/helpers/springPulse";
import { signal } from "../../core/helpers/solid";
import { createContext, createEffect } from "solid-js";
import { ScrollContainerStore } from "../scrollContainerStore";
import { PerformanceEditorStore } from "./performanceEditorStore";

export const PerformanceEditorContext = createContext<{
	perf: PerformanceEditorStore;
	scroll: ScrollContainerStore;
}>();

export const PerformanceEditor = () => {
	const perf = new PerformanceEditorStore();
	const scroll = new ScrollContainerStore();
	const showSpring = new SpringPulse();

	showSpring.damping = 50;
	showSpring.stiffness = 300;
	showSpring.snapTo(130);

	createEffect(() => {
		console.log("test");
		showSpring.moveTo(perf.open() ? 130 : 0);
	});

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
