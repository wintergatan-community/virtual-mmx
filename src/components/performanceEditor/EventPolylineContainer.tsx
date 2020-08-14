import React, { Component, createRef } from "react";
import { observable, action, computed } from "mobx";
import { EventBase } from "../../core/eventTimelines/types/other";
import { PolylineEventTimeline } from "../../core/eventTimelines/variations/polyline";
import { EventCurve } from "./EventCurve";
import { Curve } from "../../core/eventTimelines/types/curves";
import { observer } from "mobx-react";
import { MouseTracker } from "../bass/MouseTracker";
import { mapValue } from "../../core/helpers/functions";

interface EventPolylineContainerProps<E extends EventBase> {
	timeline: PolylineEventTimeline<E>;
	shouldShow: (curve: Curve<E>) => boolean;
	colorOf: (curve: Curve<E> | null) => string;
	value: (event: E) => number;
	valToPixel: (value: number) => number;
	newEventAt: (tick: number, value: number) => E;
}

@observer
export class EventPolylineContainer<E extends EventBase> extends Component<
	EventPolylineContainerProps<E>
> {
	@observable hovering = false;
	mouse = new MouseTracker();
	wholeRef = createRef<SVGRectElement>();
	@observable selectedEvent: E | undefined;

	componentDidMount() {
		if (!this.wholeRef.current) return;
		this.mouse.setElement(this.wholeRef.current);

		document.addEventListener("click", () => {
			if (this.curvesFromSplit) {
				this.applySplit();
			}
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Backspace" || e.key === "Delete") {
				this.removeSelected();
			}
		});
	}

	@action removeSelected() {
		if (!this.selectedEvent) return;
		const difs = this.props.timeline.getRemoveDifs(this.selectedEvent);
		if (!difs) return;
		this.props.timeline.applyDifs(difs);
		this.selectedEvent = undefined;
	}

	@computed get curves() {
		return this.props.timeline.curves;
	}

	@action.bound handleMouseEnter() {
		this.hovering = true;
	}
	@action.bound handleMouseLeave() {
		this.hovering = false;
		this.mouse.leave();
	}
	@action.bound handleMouseMove(
		e: React.MouseEvent<SVGRectElement, MouseEvent>
	) {
		this.mouse.update(e);
	}

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

	@computed get curvesFromSplit() {
		if (!this.mouse.mousePos || this.selectedEvent) return;
		const tick = this.mouse.mousePos.x;
		const pad = 20;
		const val = mapValue(this.mouse.mousePos.y, 150 - pad, pad, 0, 20);

		return this.props.timeline.getAddDifs(this.props.newEventAt(tick, val));
	}

	@action.bound applySplit() {
		if (!this.curvesFromSplit || this.dragging) return;
		this.props.timeline.applyDifs(this.curvesFromSplit);
	}

	render() {
		return (
			<g>
				<rect
					ref={this.wholeRef}
					width={9000}
					height={150}
					fill="#0000"
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onMouseMove={this.handleMouseMove}
				/>
				{this.selectedEvent && (
					<circle
						r={12}
						cx={this.selectedEvent.tick}
						cy={this.props.valToPixel(this.props.value(this.selectedEvent))}
						fill={this.props.colorOf(null) + "33"}
					/>
				)}

				{this.curves.map((curve, i) => {
					const start = {
						left: i > 0 ? this.curves[i - 1].start.tick : 0,
						right: curve.end?.tick ?? Infinity,
					};
					const end = {
						left: curve.start.tick,
						right:
							i < this.curves.length - 1
								? this.curves[i + 1].start?.tick ?? Infinity
								: Infinity,
					};

					return (
						<EventCurve
							curve={curve}
							bounds={{ start, end }}
							setSelected={this.setSelected}
							selectedEvent={this.selectedEvent}
							dragging={this.dragging}
							setDragging={this.setDragging}
							shouldShow={this.props.shouldShow}
							colorOf={this.props.colorOf}
							value={this.props.value}
							valToPixel={this.props.valToPixel}
							key={curve.id}
						/>
					);
				})}

				{this.curvesFromSplit && this.mouse.mousePos && !this.dragging && (
					<>
						<circle
							cx={this.mouse.mousePos.x}
							cy={this.mouse.mousePos.y}
							r={8}
							fill={this.props.colorOf(null) + "33"}
							pointerEvents="none"
						/>
						{this.curvesFromSplit.map((curveDif) => {
							if (curveDif.type !== "split") return;
							const c = curveDif.curve;
							const y = (event: E) => {
								return this.props.valToPixel(this.props.value(event));
							};
							const yAt = y(curveDif.at);

							return (
								<g key={curveDif.index}>
									<line
										x1={c.start.tick}
										y1={y(c.start)}
										x2={curveDif.at.tick}
										y2={yAt}
										stroke={this.props.colorOf(null) + "33"}
										strokeWidth={3}
										pointerEvents="none"
									/>
									<line
										x1={curveDif.at.tick}
										y1={yAt}
										x2={c.end?.tick ?? 9000} // TODO not fixed
										y2={c.end ? y(c.end) : yAt}
										stroke={this.props.colorOf(null) + "33"}
										strokeWidth={3}
										pointerEvents="none"
									/>
								</g>
							);
						})}
					</>
				)}
			</g>
		);
	}
}
