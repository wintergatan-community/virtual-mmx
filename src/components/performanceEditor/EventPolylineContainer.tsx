import React, { Component } from "react";
import { observable, action, computed } from "mobx";
import { EventBase } from "../../core/eventTimelines/types/other";
import { PolylineEventTimeline } from "../../core/eventTimelines/variations/polyline";
import { EventCurve } from "./EventCurve";

interface EventPolylineContainerProps<E extends EventBase> {
	timeline: PolylineEventTimeline<E>;
	color: string;
}

export class EventPolylineContainer<E extends EventBase> extends Component<
	EventPolylineContainerProps<E>
> {
	@observable hovering = false;
	@observable mouseX: number | undefined;

	@computed get curves() {
		return this.props.timeline.curves;
	}

	@action.bound handleMouseEnter() {
		this.hovering = true;
	}
	@action.bound handleMouseLeave() {
		this.hovering = false;
		this.mouseX = undefined;
	}
	@action.bound handleMouseMove(
		e: React.MouseEvent<SVGRectElement, MouseEvent>
	) {
		this.mouseX = e.clientX;
	}
	@action.bound handleClick() {
		if (!this.hovering) return;
	}
	@observable selectedEvent: E | undefined;

	@action.bound setSelected(event: E | undefined) {
		this.selectedEvent = event;
	}

	@observable dragging = false;
	@action.bound setDragging(dragging: boolean) {
		this.dragging = dragging;
		if (dragging === true) {
			this.selectedEvent = undefined;
		}
	}

	render() {
		return (
			<g>
				<rect
					width={2000}
					height={16}
					y={-8}
					fill="#0000"
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseMove={this.handleMouseMove}
					onClick={this.handleClick}
				/>
				{this.hovering && (
					<circle
						cx={this.mouseX}
						r={8}
						fill={this.props.color + "66"}
						pointerEvents="none"
					/>
				)}

				{this.curves.map((curve, i) => {
					const left = i > 0 ? this.curves[i - 1].end?.tick ?? 0 : 0;
					const right =
						i < this.curves.length - 1
							? this.curves[i + 1].start?.tick ?? Infinity
							: Infinity;

					return (
						<EventCurve
							curve={curve}
							bounds={{ left, right }}
							color={this.props.color}
							setSelected={
								this.setSelected as (event: EventBase | undefined) => void
							} // TODO not sure why cast is needed
							selectedEvent={this.selectedEvent}
							dragging={this.dragging}
							setDragging={this.setDragging}
							key={curve.id}
						/>
					);
				})}
			</g>
		);
	}
}
