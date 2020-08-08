import { MuteEventTimeline } from "../../stores/eventTimeline";
import { MuteEvent, DraggableCollisionEvent } from "./other";
import { AppComponent } from "../storeComponents";
import React, { createRef } from "react";
import { SpringPulse } from "../../core/helpers/springPulse";
import { action } from "mobx";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

interface EventBlipProps {
	timeline: MuteEventTimeline;
	event: MuteEvent;
	bounds: { left: number; right: number };
	// swapEvents: () => void;
	color: string;
	selected: boolean;
	setSelected: (selected: boolean) => void;
	dragging: boolean;
	setDragging: (dragging: boolean) => void;
}

class EventBlip_ extends AppComponent<EventBlipProps> {
	blipRef = createRef<SVGCircleElement>();

	bounce = new SpringPulse();

	componentDidMount() {
		this.bounce.damping = 20;
		this.bounce.stiffness = 200;
	}

	@action.bound handleDrag(_: DraggableEvent, e: DraggableData) {
		this.props.setDragging(true);

		const didSwap = this.props.timeline.move(this.props.event, e.x);
		// if (didSwap) {
		// 	this.props.swapEvents();
		// }
		if (e.deltaX !== 0) {
			if (e.x === this.props.bounds.left) {
				this.onHitBounds({ velocity: -e.deltaX, side: "left" });
			} else if (e.x === this.props.bounds.right) {
				this.onHitBounds({ velocity: e.deltaX, side: "right" });
			}
		}
	}

	onHitBounds(e: DraggableCollisionEvent) {
		this.bounce.applyCollision(e.velocity * 20);
	}

	@action.bound toggleMute() {
		this.props.event.mute = !this.props.event.mute;
	}

	@action.bound handleStop() {
		setTimeout(() => {
			// TODO i dont like this setTimeout
			this.props.setDragging(false);
		}, 0);
	}

	@action.bound handleClick() {
		if (this.props.dragging) return;
		this.props.setSelected(!this.props.selected);
	}

	render() {
		return (
			<Draggable
				axis="x"
				position={{ x: this.props.event.tick, y: 0 }}
				grid={[1, 0]}
				onDrag={this.handleDrag}
				onStop={this.handleStop}
				nodeRef={(this.blipRef as unknown) as React.RefObject<HTMLElement>}
				allowAnyClick={false}
				bounds={this.props.bounds}
			>
				<g>
					<circle
						r={8 + Math.max(this.bounce.value, 0)}
						fill={this.props.color + "44"}
					/>
					<circle
						r={8}
						fill={this.props.color}
						ref={this.blipRef}
						onClick={this.handleClick}
					/>
					{this.props.selected && (
						<g fill="white" transform="translate(0, -15)">
							<polygon points="0,0 8,-10 -8,-10" />
							<rect width={80} height={80} x={-40} y={-90} rx={12} />
							<circle
								r={10}
								fill={this.props.event.mute ? "red" : "green"}
								cy={-40}
								onClick={this.toggleMute}
							/>
						</g>
					)}
				</g>
			</Draggable>
		);
	}
}
export const EventBlip = AppComponent.sync(EventBlip_);
