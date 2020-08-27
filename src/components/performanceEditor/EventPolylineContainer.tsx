import { EventBase, CurveDif } from "../../core/eventTimelines/types/other";
import { PolylineEventTimeline } from "../../core/eventTimelines/variations/polyline";
import { EventCurve } from "./EventCurve";
import { Curve } from "../../core/eventTimelines/types/curves";
import { mapValue } from "../../core/helpers/functions";
import { signal } from "../../core/helpers/solid";
import { MouseTracker } from "../../core/helpers/MouseTracker";
import { For, Show } from "solid-js";

interface EventPolylineContainerProps<E extends EventBase> {
	timeline: PolylineEventTimeline<E>;
	shouldShow: (curve: Curve<E>) => boolean;
	colorOf: (curve: Curve<E> | null) => string;
	value: (event: E) => number;
	valToPixel: (value: number) => number;
	newEventAt: (tick: number, value: number) => E;
}

export function EventPolylineContainer<E extends EventBase>(
	props: EventPolylineContainerProps<E>
) {
	const hovering = signal(false);
	const mouse = new MouseTracker();
	const dragging = signal(false);
	const selectedEvent = signal<E | undefined>(undefined);
	const curves = props.timeline.curves;

	document.addEventListener("click", () => {
		if (curvesFromSplit()) {
			applySplit();
		}
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Backspace" || e.key === "Delete") {
			removeSelected();
		}
	});

	function removeSelected() {
		if (!selectedEvent) return;
		const difs = props.timeline.getRemoveDifs(selectedEvent() as E);
		if (!difs) return;
		props.timeline.applyDifs(difs);
		selectedEvent(undefined);
	}

	function handleMouseEnter() {
		hovering(true);
	}
	function handleMouseLeave() {
		hovering(false);
	}

	function setSelected(event: E | undefined) {
		selectedEvent(event);
	}

	function setDragging(dragging: boolean) {
		dragging = dragging;
		if (dragging === true) {
			selectedEvent(undefined);
		}
	}

	const curvesFromSplit = () => {
		const m = mouse.mousePos();
		if (!m || selectedEvent) return null;
		const tick = m.x;
		const pad = 20;
		const val = mapValue(m.y, 150 - pad, pad, 0, 20);

		return props.timeline.getAddDifs(props.newEventAt(tick, val));
	};

	function applySplit() {
		if (!curvesFromSplit || dragging) return;
		props.timeline.applyDifs(curvesFromSplit() as CurveDif<E>[]);
	}

	let wholeRef!: SVGRectElement;
	const jsx = (
		<g>
			<rect
				ref={wholeRef}
				width={9000}
				height={150}
				fill="#0000"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			/>
			<Show when={selectedEvent()}>
				<circle
					r={12}
					cx={selectedEvent()?.tick()}
					cy={props.valToPixel(props.value(selectedEvent()!))}
					fill={props.colorOf(null) + "33"}
				/>
			</Show>

			<For each={curves}>
				{(curve, ind) => {
					const i = ind();
					const start = {
						left: i > 0 ? curves[i - 1].start.tick : 0,
						right: curve.end?.tick ?? Infinity,
					};
					const end = {
						left: curve.start.tick,
						right:
							i < curves.length - 1
								? curves[i + 1].start?.tick ?? Infinity
								: Infinity,
					};

					return (
						<></>
						// <EventCurve
						// 	curve={curve}
						// 	bounds={{ start, end }}
						// 	setSelected={setSelected}
						// 	selectedEvent={selectedEvent()}
						// 	dragging={dragging()}
						// 	setDragging={setDragging}
						// 	shouldShow={props.shouldShow}
						// 	colorOf={props.colorOf}
						// 	value={props.value}
						// 	valToPixel={props.valToPixel}
						// />
					);
				}}
			</For>

			{curvesFromSplit && mouse.mousePos && !dragging && (
				<>
					<circle
						cx={mouse.mousePos()?.x}
						cy={mouse.mousePos()?.y}
						r={8}
						fill={props.colorOf(null) + "33"}
						pointerEvents="none"
					/>
					<For each={curvesFromSplit() || []}>
						{(curveDif) => {
							if (curveDif.type !== "split") return;
							const c = curveDif.curve;
							const y = (event: E) => {
								return props.valToPixel(props.value(event));
							};
							const yAt = y(curveDif.at);

							return (
								<g>
									<line
										x1={c.start.tick()}
										y1={y(c.start)}
										x2={curveDif.at.tick()}
										y2={yAt}
										stroke={props.colorOf(null) + "33"}
										strokeWidth={3}
										pointerEvents="none"
									/>
									<line
										x1={curveDif.at.tick()}
										y1={yAt}
										x2={c.end?.tick() ?? 9000} // TODO not fixed
										y2={c.end ? y(c.end) : yAt}
										stroke={props.colorOf(null) + "33"}
										strokeWidth={3}
										pointerEvents="none"
									/>
								</g>
							);
						}}
					</For>
				</>
			)}
		</g>
	);
	mouse.setElement(wholeRef);
	return jsx;
}
