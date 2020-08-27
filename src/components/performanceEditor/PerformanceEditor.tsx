import { ScrollableTimeline } from "./ScrollableTimeline";
import { PerformanceAction } from "./other";
import { TimelineTabs } from "./TimelineTab";
import { SpringPulse } from "../../core/helpers/springPulse";
import { signal } from "../../core/helpers/solid";

export const PerformanceEditor = () => {
	const performanceActions: PerformanceAction[] = [
		"Muting Levers",
		"Bass Capo",
		"Hihat Opening",
	];
	const showSpring = new SpringPulse();

	showSpring.damping = 50;
	showSpring.stiffness = 300;
	showSpring.snapTo(130);

	const selectedAction = signal<PerformanceAction | undefined>(
		performanceActions[1]
	);

	function setAction(action: PerformanceAction) {
		selectedAction(action);
	}

	const open = signal(false);

	function show() {
		open(true);
		showSpring.moveTo(0);
	}
	function hide() {
		open(false);
		showSpring.moveTo(130);
	}
	function toggleShow() {
		open() ? hide() : show();
	}

	return (
		<div
			style={{
				position: "absolute",
				width: "100%",
				bottom: "0px",
				transform: `translateY(${showSpring.value}px)`,
			}}
		>
			<TimelineTabs
				actions={performanceActions}
				selectedAction={selectedAction()}
				setAction={setAction}
				toggleShow={toggleShow}
				show={show}
			/>
			<ScrollableTimeline
				actions={performanceActions}
				selectedAction={selectedAction()}
			/>
		</div>
	);
};
