import React, { Component } from "react";
import { AppComponent } from "../storeComponents";
import { ScrollableTimeline } from "./ScrollableTimeline";
import { action, observable } from "mobx";
import { PerformanceAction } from "./other";
import { TimelineTabs } from "./TimelineTab";
import { observer } from "mobx-react";

@observer
export class PerformanceEditor extends Component {
	@observable performanceActions: PerformanceAction[] = [
		"Muting Levers",
		"Bass Capo",
		"Hihat Opening",
	];

	@observable selectedAction: PerformanceAction | undefined = this
		.performanceActions[1];

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
