import React, { Component } from "react";
import { PerformanceAction } from "./other";

interface TimelineTabProps {
	label: string;
	selected: boolean;
	select: () => void;
}
export class TimelineTab extends Component<TimelineTabProps> {
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
interface TimelineTabsProps {
	setAction: (action: PerformanceAction) => void;
	selectedAction: PerformanceAction | undefined;
	actions: PerformanceAction[];
	toggleShow: () => void;
	show: () => void;
}

export class TimelineTabs extends Component<TimelineTabsProps> {
	render() {
		return (
			<div style={{ display: "flex" }} onClick={this.props.show}>
				{this.props.actions.map((action) => (
					<TimelineTab
						label={action}
						selected={this.props.selectedAction === action}
						select={() => this.props.setAction(action)}
						key={action}
					/>
				))}
				<div
					style={{
						width: 30,
						backgroundColor: "blue",
						borderRadius: "20px 20px 0px 0px",
					}}
					onClick={(e) => {
						e.stopPropagation();
						this.props.toggleShow();
					}}
				/>
			</div>
		);
	}
}
