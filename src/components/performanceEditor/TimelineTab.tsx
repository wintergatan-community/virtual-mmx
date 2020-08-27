import { PerformanceAction } from "./other";
import { For } from "solid-js";

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
interface TimelineTabsProps {
	setAction: (action: PerformanceAction) => void;
	selectedAction: PerformanceAction | undefined;
	actions: PerformanceAction[];
	toggleShow: () => void;
	show: () => void;
}

export const TimelineTabs = (props: TimelineTabsProps) => {
	return (
		<div style={{ display: "flex" }} onClick={props.show}>
			<For each={props.actions}>
				{(action) => (
					<TimelineTab
						label={action}
						selected={props.selectedAction === action}
						select={() => props.setAction(action)}
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
					props.toggleShow();
				}}
			/>
		</div>
	);
};
