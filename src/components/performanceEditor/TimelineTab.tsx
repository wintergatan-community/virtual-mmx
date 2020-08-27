import { PerformanceAction } from "./other";
import { For, useContext } from "solid-js";
import { PerformanceEditorContext } from "./PerformanceEditor";

interface TimelineTabProps {
	label: string;
	selected: boolean;
	select: () => void;
}

export const TimelineTab = (props: TimelineTabProps) => {
	return (
		<div
			style={{
				height: "30px",
				"background-color": props.selected ? "#d9d9d9" : "#b7b7b7",
				"font-size": "12px",
				"border-radius": "20px 20px 0px 0px",
				"user-select": "none",
				"line-height": "13px",
				// textAlign: "center",
				padding: "10px",
			}}
			onClick={props.select}
		>
			{props.label}
		</div>
	);
};

export const TimelineTabs = () => {
	const { perf } = useContext(PerformanceEditorContext);
	return (
		<div style={{ display: "flex" }} onClick={perf.show}>
			<For each={perf.performanceActions}>
				{(action) => (
					<TimelineTab
						label={action}
						selected={perf.selectedAction() === action}
						select={() => perf.setAction(action)}
					/>
				)}
			</For>
			<div
				style={{
					width: "30px",
					"background-color": "blue",
					"border-radius": "20px 20px 0px 0px",
				}}
				onClick={(e) => {
					e.stopPropagation();
					perf.toggleShow();
				}}
			/>
		</div>
	);
};
