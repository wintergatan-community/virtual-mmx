import { AppComponent } from "../storeComponents";
import { MuteSegment, MuteEventTimeline } from "../../stores/eventTimeline";
import { MuteEvent } from "./other";
import React from "react";
import { EventBlip } from "./EventBlip";
import { action } from "mobx";

interface SegmentProps {
	segment: MuteSegment;
	timeline: MuteEventTimeline;
	// swapSegment: () => void;
	bounds: { left: number; right: number };
	color: string;
	selectedEvent: MuteEvent | undefined;
	setSelected: (event: MuteEvent | undefined) => void;
	dragging: boolean;
	setDragging: (dragging: boolean) => void;
}

class Segment_ extends AppComponent<SegmentProps> {
	@action.bound setStartSelected(shouldSelect: boolean) {
		if (!this.props.segment.start) return;
		this.setSelected(this.props.segment.start, shouldSelect);
	}
	@action.bound setEndSelected(shouldSelect: boolean) {
		if (!this.props.segment.end) return;
		this.setSelected(this.props.segment.end, shouldSelect);
	}
	@action.bound setSelected(event: MuteEvent, shouldSelect: boolean) {
		this.props.setSelected(shouldSelect ? event : undefined);
	}

	render() {
		const p = this.props;
		const seg = p.segment;
		return (
			<g>
				<line
					x1={seg.start?.tick ?? 0}
					x2={seg.end?.tick ?? Infinity}
					stroke={p.color}
					strokeWidth={3}
				/>
				{seg.start && (
					<EventBlip
						event={seg.start}
						timeline={p.timeline}
						bounds={{ left: p.bounds.left, right: Infinity }}
						// swapEvents={p.swapSegment}
						color={p.color}
						selected={p.selectedEvent === seg.start}
						setSelected={this.setStartSelected}
						dragging={this.props.dragging}
						setDragging={this.props.setDragging}
					/>
				)}
				{seg.end && (
					<EventBlip
						event={seg.end}
						timeline={p.timeline}
						bounds={{ left: 0, right: p.bounds.right }}
						// swapEvents={p.swapSegment}
						color={p.color}
						selected={p.selectedEvent === seg.end}
						setSelected={this.setEndSelected}
						dragging={this.props.dragging}
						setDragging={this.props.setDragging}
					/>
				)}
			</g>
		);
	}
}

export const Segment = AppComponent.sync(Segment_);
