import React from "react";
import { AppComponent } from "../storeComponents";
import { computed } from "mobx";
import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { RunningTimeline } from "./RunningTimeline";
import { TimelineLabel } from "./TimelineLabel";
import { PerformanceAction } from "./other";

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

	@computed get timelines() {
		return this.app.performance.eventTimelines.machine.channelMute;
	}

	colors: Record<ChannelGroupTOFIX, string> = {
		bass: "#85200c",
		vibraphone: "#1155cc",
		bassdrum: "#bf9000",
		hihat: "#ff3300",
		snare: "#9900ff",
		crash: "#00ff00",
	};

	render() {
		return (
			<svg style={{ width: "100%", userSelect: "none" }}>
				<rect width={2000} height={150} fill="#d9d9d9" /> {/*TODO not fixed*/}
				{this.props.selectedAction?.label === "Muting Levers" && (
					<g transform="translate(0, 12)">
						<g transform={`translate(0, 0)`}>
							{Object.entries(this.timelines).map(([label, timeline], i) => (
								<RunningTimeline
									timeline={timeline}
									y={i * 25}
									color={this.colors[label as ChannelGroupTOFIX]}
									key={label}
								/>
							))}
						</g>
						{Object.keys(this.timelines).map((label, i) => (
							<TimelineLabel label={label} y={i * 25} key={label} />
						))}
					</g>
				)}
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
