import React from "react";
import { AppComponent } from "../storeComponents";
import { ScrollableTimeline } from "./ScrollableTimeline";
import { action, observable } from "mobx";
import { PerformanceAction } from "./other";
import { TimelineTabs } from "./TimelineTab";

class PerformanceEditor_ extends AppComponent {
	@observable performanceActions: PerformanceAction[] = [
		{ label: "Muting Levers" },
		{ label: "Bass Fretting" },
	];

	@observable selectedAction: PerformanceAction | undefined;

	@action.bound setAction(action: PerformanceAction) {
		this.selectedAction = action;
	}

	render() {
		return (
			<div
				style={{
					position: "absolute",
					width: "100%",
					bottom: 0,
				}}
			>
				<TimelineTabs
					actions={this.performanceActions}
					selectedAction={this.selectedAction}
					setAction={this.setAction}
				/>
				<ScrollableTimeline
					actions={this.performanceActions}
					selectedAction={this.selectedAction}
				/>
			</div>
		);
	}
}

export const PerformanceEditor = AppComponent.sync(PerformanceEditor_);
