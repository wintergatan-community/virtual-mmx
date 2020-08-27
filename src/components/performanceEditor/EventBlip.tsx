import { SpringPulse } from "../../core/helpers/springPulse";
// import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { DraggableCollisionEvent } from "./other";
import { EventBase } from "../../core/eventTimelines/types/other";
import { Bounds } from "./EventCurve";
import { Curve } from "../../core/eventTimelines/types/curves";

interface EventBlipProps<E extends EventBase> {
	curve: Curve<E>;
	bounds: Bounds;
	colorOf: (curve: Curve<E> | null) => string;
	selected: boolean;
	setSelected: (selected: boolean) => void;
	dragging: boolean;
	setDragging: (dragging: boolean) => void;
	value: (event: E) => number;
	valToPixel: (value: number) => number;
}

export function EventBlip<E extends EventBase>(props: EventBlipProps<E>) {
	const bounce = new SpringPulse();

	bounce.damping = 20;
	bounce.stiffness = 200;

	function handleDrag(/*_: DraggableEvent, e: DraggableData*/) {
		// props.setDragging(true);
		// props.curve.modifyEvent({ tick: e.x });
		// if (e.deltaX !== 0) {
		// 	if (e.x === props.bounds.left) {
		// 		onHitBounds({ velocity: -e.deltaX, side: "left" });
		// 	} else if (e.x === props.bounds.right) {
		// 		onHitBounds({ velocity: e.deltaX, side: "right" });
		// 	}
		// }
	}

	function onHitBounds(e: DraggableCollisionEvent) {
		bounce.applyCollision(e.velocity * 20);
	}

	function handleStop() {
		setTimeout(() => {
			// TODO i dont like this setTimeout
			props.setDragging(false);
		}, 0);
	}

	function handleClick() {
		if (props.dragging) return;
		props.setSelected(!props.selected);
	}

	let blipRef: SVGCircleElement;
	const jsx = <></>;
	// 	<Draggable
	// 		axis="x"
	// 		position={{
	// 			x: props.curve.start.tick,
	// 			y: props.valToPixel(props.value(props.curve.start)),
	// 		}}
	// 		grid={[1, 0]}
	// 		onDrag={handleDrag}
	// 		onStop={handleStop}
	// 		nodeRef={(blipRef as unknown) as React.RefObject<HTMLElement>}
	// 		allowAnyClick={false}
	// 		bounds={props.bounds}
	// 	>
	// 		<g>
	// 			<circle
	// 				r={8 + Math.max(bounce.value, 0)}
	// 				fill={props.colorOf(null) + "44"}
	// 			/>
	// 			<circle
	// 				r={8}
	// 				fill={props.colorOf(null)}
	// 				ref={blipRef}
	// 				onClick={handleClick}
	// 			/>
	// 			{props.selected && (
	// 				<g fill="white" transform="translate(0, -15)">
	// 					<polygon points="0,0 8,-10 -8,-10" />
	// 					<rect width={80} height={80} x={-40} y={-90} rx={12} />
	// 					{/* <circle
	// 							r={10}
	// 							fill={props.event.mute ? "red" : "green"}
	// 							cy={-40}
	// 						/> */}
	// 				</g>
	// 			)}
	// 		</g>
	// 	</Draggable>
	// );

	return jsx;
}
