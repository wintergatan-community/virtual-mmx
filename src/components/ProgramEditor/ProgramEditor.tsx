import React, { useContext, useRef, useState } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { range } from "../../core/helpers";
import RunningChannel from "./RunningChannel";
import SubdivisionLine from "./SubdivisionLine";
import Peg from "./Peg";
import SubdivisonChooser from "./SubdivisionChooser";
import GearSide from "./GearSide";
import WheelBlur from "./WheelBlur";
import { VibraphoneChannel } from "vmmx-schema";

export default function ProgramEditor() {
	const {
		width,
		height,
		pixelToTick,
		pixelToChannel,
		noteSubdivision,
		tickedDropEvents,
		setTickedDropEvents,
		showEmpties,
		spacing,
		setSpacing,
		viewingEditorTick,
		setViewingEditorTick,
		channels,
	} = useContext(EditorContext);

	const svgRef = useRef<SVGSVGElement>(null);

	const tickDivisions = range(0, pixelToTick(width), noteSubdivision);
	const visibleStartTick = 0; // TODO correctly
	const visibleEndTick = tickDivisions[tickDivisions.length - 1]; // TODO out of bounds

	const [mousePos, setMousePos] = useState<{
		mouseTick: number;
		mouseChannel: number;
	}>();

	const updateMousePos = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		if (!svgRef.current) return;
		const svgBound = svgRef.current.getBoundingClientRect();
		const x = e.clientX - svgBound.left;
		const looseChannel = pixelToChannel(x);
		const mouseChannel = Math.floor(looseChannel);

		const y = e.clientY - svgBound.top;
		const looseTick = pixelToTick(y);
		const mouseTick = Math.floor(looseTick / noteSubdivision) * noteSubdivision;

		setMousePos({ mouseTick, mouseChannel });
	};

	const handleScroll = (e: React.WheelEvent<SVGSVGElement>) => {
		if (e.shiftKey) {
			// e.preventDefault();
			let dy = spacing - e.deltaY / 20;
			if (dy < 10) dy = 10;
			setSpacing(dy);
		} else {
			let dy = viewingEditorTick - e.deltaY / 5;
			if (dy > 0) dy = 0;
			if (dy < -height) dy = -height;
			setViewingEditorTick(dy);
		}
	};

	const addPeg = (tick: number, channel: VibraphoneChannel) => {
		// TODO fix for other instruments
		const newTickedDropEvents = tickedDropEvents.concat({
			tick,
			channel,
			kind: "vibraphone",
		});
		newTickedDropEvents.sort((a, b) => a.tick - b.tick);
		setTickedDropEvents(newTickedDropEvents);
	};

	return (
		<div style={{ width, height: 400, overflow: "hidden" }}>
			{/* overflow: "scroll" */}
			<svg
				viewBox={`0 0 ${width} ${height}`}
				style={{
					width,
					height,
				}}
				onMouseMove={updateMousePos}
				onWheel={handleScroll}
				ref={svgRef}
			>
				<g style={{ transform: `translateY(${viewingEditorTick}px)` }}>
					{/* moving */}
					{channels.map((note, channel) => (
						<RunningChannel note={note} channel={channel} key={channel} />
					))}
					{tickDivisions.map((tick, i) => (
						<SubdivisionLine tick={tick} key={i} />
					))}
					{tickedDropEvents.map((event, i) => {
						// TODO fix for other instruments
						if (event.kind !== "vibraphone") return null;
						const { tick, channel } = event;
						if (tick > visibleEndTick || tick < visibleStartTick) return null; // TODO optimize

						const removePeg = () => {
							let newTickedDropEvents = tickedDropEvents.filter(
								(e) => e !== event
							);
							setTickedDropEvents(newTickedDropEvents);
						};

						return (
							<Peg
								tick={tick}
								channel={channel}
								key={i}
								activeDivision={tick % noteSubdivision === 0}
								click={removePeg}
							/>
						);
					})}
					{(() => {
						// TODO this is ugly and needs to get out of a IIEF
						if (!mousePos) return;
						const { mouseTick, mouseChannel } = mousePos;
						if (
							// TODO fix for other instruments
							tickedDropEvents.some(
								(e) =>
									e.kind === "vibraphone" &&
									e.tick === mouseTick &&
									e.channel === mouseChannel
							)
						)
							return null;
						return (
							<Peg
								tick={mouseTick}
								channel={mouseChannel}
								activeDivision={false}
								click={() =>
									addPeg(mouseTick, mouseChannel as VibraphoneChannel)
								}
							/>
						);
					})()}
					<SubdivisonChooser />
					{
						showEmpties ? null : null // TODO, add this thing
					}
					<GearSide x={0} />
					<GearSide x={475} />
				</g>
				<WheelBlur />
			</svg>
		</div>
	);
}
