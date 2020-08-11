import React from "react";
import { AppComponent } from "../storeComponents";
import { computed } from "mobx";
import { PerformanceAction } from "./other";
import { MuteActionEditor } from "./MuteActionEditor";
import { HiHatOpeningActionEditor } from "./HiHatOpeningActionEditor";
import { BassCapoActionEditor } from "./BassCapoActionEditor";

interface ScrollableTimelineProps {
	actions: PerformanceAction[];
	selectedAction: PerformanceAction | undefined;
}

class ScrollableTimeline_ extends AppComponent<ScrollableTimelineProps> {
	@computed get height() {
		return 180;
	}
	@computed get tick() {
		return this.app.player.currentTick;
	}

	@computed get actionEditor() {
		const action = this.props.selectedAction;
		if (!action) return;
		if (action === "Muting Levers") {
			return <MuteActionEditor />;
		} else if (action === "Hihat Opening") {
			return <HiHatOpeningActionEditor />;
		} else if (action === "Bass Capo") {
			return <BassCapoActionEditor />;
		}
	}

	render() {
		return (
			<svg style={{ width: "100%", userSelect: "none" }}>
				<rect width={2000} height={150} fill="#d9d9d9" /> {/*TODO not fixed*/}
				{this.actionEditor}
				<line
					x1={this.tick}
					x2={this.tick}
					y2={this.height}
					stroke="#6dcf43"
					strokeWidth={2}
				/>
			</svg>
		);
	}
}

export const ScrollableTimeline = AppComponent.sync(ScrollableTimeline_);
