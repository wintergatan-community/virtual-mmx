import { MuteEventTimeline } from "../../stores/eventTimeline";
import { AppComponent } from "../storeComponents";
import { observable, action, computed } from "mobx";
import React from "react";
import { MuteEvent } from "./other";
import { Segment } from "./Segment";

interface RunningTimelineProps {
	timeline: MuteEventTimeline;
	y: number;
	color: string;
}

class RunningTimeline_ extends AppComponent<RunningTimelineProps> {
	// componentDidMount() {
	// 	this.setupSegments();
	// }

	// @action setupSegments() {
	// 	let workingSegment = {} as SegmentData;
	// 	for (const event of this.props.timeline.events) {
	// 		if (workingSegment.start === undefined) {
	// 			// looking for start
	// 			if (event.mute === true) {
	// 				workingSegment.start = event;
	// 			}
	// 		} else {
	// 			// looking for end
	// 			if (event.mute === false) {
	// 				workingSegment.end = event;
	// 				this.segments.push(workingSegment);
	// 				workingSegment = {} as SegmentData;
	// 			}
	// 		}
	// 	}
	// }

	// swapSegment(segment: SegmentData) {
	// 	const i = this.segments.findIndex((s) => s === segment);
	// 	this.segments[i] = { start: segment.end, end: segment.start };
	// }

	@observable hovering = false;
	@observable mouseX: number | undefined;

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

		// this.props.timeline.add({ mute: true, tick: 30, id: Math.random() });
	}
	@observable selectedEvent: MuteEvent | undefined;

	@action.bound setSelected(event: MuteEvent | undefined) {
		this.selectedEvent = event;
	}

	@observable dragging = false;
	@action.bound setDragging(dragging: boolean) {
		this.dragging = dragging;
		if (dragging === true) {
			this.selectedEvent = undefined;
		}
	}

	@computed get segments() {
		return this.props.timeline.segments;
	}

	render() {
		return (
			<g transform={`translate(0, ${this.props.y})`}>
				<line x2={2000} stroke="#b7b7b7" />
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

				{this.segments.map((segment, i) => {
					const left = i > 0 ? this.segments[i - 1].end?.tick ?? 0 : 0;
					const right =
						i < this.segments.length - 1
							? this.segments[i + 1].start?.tick ?? Infinity
							: Infinity;

					// const swapSegment = () => this.swapSegment(segment);

					return (
						<Segment
							segment={segment}
							bounds={{ left, right }}
							timeline={this.props.timeline}
							// swapSegment={swapSegment}
							color={this.props.color}
							key={i}
							setSelected={this.setSelected}
							selectedEvent={this.selectedEvent}
							dragging={this.dragging}
							setDragging={this.setDragging}
						/>
					);
				})}
			</g>
		);
	}
}
export const RunningTimeline = AppComponent.sync(RunningTimeline_);
