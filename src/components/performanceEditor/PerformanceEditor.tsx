import React, { Component } from "react";
import { AppComponent } from "../storeComponents";
import { ScrollableTimeline } from "./ScrollableTimeline";
import { action, observable } from "mobx";
import { PerformanceAction } from "./other";
import { TimelineTabs } from "./TimelineTab";
import { observer } from "mobx-react";
import { SpringPulse } from "../../core/helpers/springPulse";

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

	@observable open = false;
	showSpring = new SpringPulse();

	@action.bound show() {
		this.open = true;
		this.showSpring.moveTo(0);
	}
	@action.bound hide() {
		this.open = false;
		this.showSpring.moveTo(130);
	}
	@action.bound toggleShow() {
		this.open ? this.hide() : this.show();
	}

	componentDidMount() {
		this.showSpring.damping = 50;
		this.showSpring.stiffness = 300;
		this.showSpring.snapTo(130);
	}

	render() {
		return (
			<div
				style={{
					position: "absolute",
					width: "100%",
					bottom: 0,
					transform: `translateY(${this.showSpring.value}px)`,
				}}
			>
				<TimelineTabs
					actions={this.performanceActions}
					selectedAction={this.selectedAction}
					setAction={this.setAction}
					toggleShow={this.toggleShow}
					show={this.show}
				/>
				<ScrollableTimeline
					actions={this.performanceActions}
					selectedAction={this.selectedAction}
				/>
			</div>
		);
	}
}
