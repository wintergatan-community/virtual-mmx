import React from "react";
import { AppComponent } from "../storeComponents";
import { PerformanceAction } from "./other";

interface TimelineTabProps {
	label: string;
	selected: boolean;
	select: () => void;
}
class TimelineTab_ extends AppComponent<TimelineTabProps> {
	render() {
		return (
			<div
				style={{
					height: 30,
					backgroundColor: this.props.selected ? "#d9d9d9" : "#b7b7b7",
					fontSize: 12,
					borderRadius: "20px 20px 0px 0px",
					userSelect: "none",
					lineHeight: "13px",
					// textAlign: "center",
					padding: 10,
				}}
				onClick={this.props.select}
			>
				{this.props.label}
			</div>
		);
	}
}
export const TimelineTab = AppComponent.sync(TimelineTab_);

interface TimelineTabsProps {
	setAction: (action: PerformanceAction) => void;
	selectedAction: PerformanceAction | undefined;
	actions: PerformanceAction[];
}

class TimelineTabs_ extends AppComponent<TimelineTabsProps> {
	render() {
		return (
			<div style={{ display: "flex" }}>
				{this.props.actions.map((action) => (
					<TimelineTab
						label={action.label}
						selected={this.props.selectedAction === action}
						select={() => this.props.setAction(action)}
						key={action.label}
					/>
				))}
			</div>
		);
	}
}
export const TimelineTabs = AppComponent.sync(TimelineTabs_);
