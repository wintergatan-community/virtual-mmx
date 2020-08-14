import React, { Component } from "react";
import { EventBlip } from "./EventBlip";
import { action } from "mobx";
import { Curve } from "../../core/eventTimelines/types/curves";
import { EventBase } from "../../core/eventTimelines/types/other";
import { observer } from "mobx-react";

export interface Bounds {
	left: number;
	right: number;
}

interface EventCurveProps<E extends EventBase> {
	curve: Curve<E>;
	bounds: { start: Bounds; end: Bounds };
	selectedEvent: E | undefined;
	setSelected: (event: E | undefined) => void;
	dragging: boolean;
	setDragging: (dragging: boolean) => void;
	shouldShow: (curve: Curve<E>) => boolean;
	colorOf: (curve: Curve<E> | null) => string;
	value: (event: E) => number;
	valToPixel: (value: number) => number;
}

@observer
export class EventCurve<E extends EventBase> extends Component<
	EventCurveProps<E>
> {
	@action.bound setStartSelected(shouldSelect: boolean) {
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
		const y1 = p.valToPixel(p.value(p.curve.start));
		const y2 = p.curve.end ? p.valToPixel(p.value(p.curve.end)) : y1;

		return (
			<g>
				{p.shouldShow(p.curve) && (
					<line
						x1={p.curve.start?.tick ?? 0}
						x2={p.curve.end?.tick ?? 9000} // TODO not fixed
						y1={y1}
						y2={y2}
						stroke={p.colorOf(p.curve)}
						strokeWidth={3}
					/>
				)}
				<EventBlip
					curve={p.curve}
					bounds={{ left: p.bounds.start.left, right: p.bounds.start.right }}
					selected={p.selectedEvent === p.curve.start}
					setSelected={this.setStartSelected}
					dragging={p.dragging}
					setDragging={p.setDragging}
					colorOf={p.colorOf}
					value={p.value}
					valToPixel={p.valToPixel}
				/>

				{/* {p.curve.end && (
					<EventBlip
						event={p.curve.end}
						bounds={{ left: p.bounds.end.left, right: p.bounds.end.right }}
						// swapEvents={p.swapEventCurve}
						color={p.color}
						selected={p.selectedEvent === p.curve.end}
						setSelected={this.setEndSelected}
						dragging={this.props.dragging}
						setDragging={this.props.setDragging}
					/>
				)} */}
			</g>
		);
	}
}
