import { AppComponent } from "../storeComponents";
import React from "react";
import { EventBlip } from "./EventBlip";
import { action } from "mobx";
import { Curve } from "../../core/eventTimelines/types/curves";
import { EventBase } from "../../core/eventTimelines/types/other";

interface SegmentProps<E extends EventBase> {
	curve: Curve<E>;
	bounds: { left: number; right: number };
	color: string;
	selectedEvent: E | undefined;
	setSelected: (event: E | undefined) => void;
	dragging: boolean;
	setDragging: (dragging: boolean) => void;
}

class EventCurve_<E extends EventBase> extends AppComponent<SegmentProps<E>> {
	@action.bound setStartSelected(shouldSelect: boolean) {
		if (!this.props.curve.start) return;
		this.setSelected(this.props.curve.start, shouldSelect);
	}
	@action.bound setEndSelected(shouldSelect: boolean) {
		if (!this.props.curve.end) return;
		this.setSelected(this.props.curve.end, shouldSelect);
	}
	@action.bound setSelected(event: E, shouldSelect: boolean) {
		this.props.setSelected(shouldSelect ? event : undefined);
	}

	render() {
		const p = this.props;
		return (
			<g>
				<line
					x1={p.curve.start?.tick ?? 0}
					x2={p.curve.end?.tick ?? Infinity}
					stroke={p.color}
					strokeWidth={3}
				/>
				<EventBlip
					event={p.curve.start}
					bounds={{ left: p.bounds.left, right: Infinity }}
					// swapEvents={p.swapSegment}
					color={p.color}
					selected={p.selectedEvent === p.curve.start}
					setSelected={this.setStartSelected}
					dragging={this.props.dragging}
					setDragging={this.props.setDragging}
				/>

				{p.curve.end && (
					<EventBlip
						event={p.curve.end}
						bounds={{ left: 0, right: p.bounds.right }}
						// swapEvents={p.swapSegment}
						color={p.color}
						selected={p.selectedEvent === p.curve.end}
						setSelected={this.setEndSelected}
						dragging={this.props.dragging}
						setDragging={this.props.setDragging}
					/>
				)}
			</g>
		);
	}
}

export const EventCurve = AppComponent.sync(EventCurve_);
