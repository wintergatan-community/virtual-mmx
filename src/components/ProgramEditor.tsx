import React, { useContext, useState, useRef } from "react";
import { EditorContext } from "../contexts/EditorContext";
import { range } from "../core/helpers";
import { RunningChannel } from "./RunningChannel";
import { Peg } from "./Peg";
import SubdivisonChooser from "./SubdivisionChooser";
import { SubdivisionLine } from "./SubdivisionLine";
import { MarbleEvent } from "../core/types";

export function ProgramEditor() {
	const {
		width,
		height,
		pixelToTick,
		pixelToChannel,
		noteDivision,
		marbleEvents,
		setMarbleEvents,
		showEmpties,
		spacing,
		setSpacing,
		viewingEditorTick,
		setViewingEditorTick,
		channels,
	} = useContext(EditorContext);

	const svgRef = useRef<SVGSVGElement>(null);

	const tickDivisions = range(0, pixelToTick(width), noteDivision);
	const visibleStartTick = 0; // TODO correctly
	const visibleEndTick = tickDivisions[tickDivisions.length - 1]; // TODO out of bounds

	const [mousePos, setMousePos] = useState<MarbleEvent>();

	const updateMousePos = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		if (!svgRef.current) return;
		const svgBound = svgRef.current.getBoundingClientRect();
		const x = e.clientX - svgBound.left;
		const looseChannel = pixelToChannel(x);
		const channel = Math.floor(looseChannel);

		const y = e.clientY - svgBound.top;
		const looseTick = pixelToTick(y);
		const tick = Math.floor(looseTick / noteDivision) * noteDivision;

		setMousePos({ tick, channel });
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

	const addPeg = (tick: number, channel: number) => {
		const newMarbleEvents = marbleEvents.concat({
			tick,
			channel,
		});
		newMarbleEvents.sort((a, b) => a.tick - b.tick);
		setMarbleEvents(newMarbleEvents);
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
					{marbleEvents.map((event, i) => {
						const { tick, channel } = event;
						if (tick > visibleEndTick || tick < visibleStartTick) return null; // TODO optimize

						const removePeg = () => {
							let newMarbleEvents = marbleEvents.filter((e) => e !== event);
							setMarbleEvents(newMarbleEvents);
						};

						return (
							<Peg
								tick={tick}
								channel={channel}
								key={i}
								activeDivision={tick % noteDivision === 0}
								click={removePeg}
							/>
						);
					})}
					{(() => {
						// TODO this is ugly and needs to get out of a IIEF
						if (!mousePos) return;
						const { tick, channel } = mousePos;
						if (
							marbleEvents.some((e) => e.tick === tick && e.channel === channel)
						)
							return null;
						return (
							<Peg
								tick={tick}
								channel={channel}
								activeDivision={false}
								click={() => addPeg(tick, channel)}
							/>
						);
					})()}
					<SubdivisonChooser />
					{
						showEmpties ? null : null // TODO, add this thing
					}
				</g>
				<WheelBlur />
			</svg>
		</div>
	);
}

function WheelBlur() {
	// shadows not great rn
	const { width } = useContext(EditorContext);

	return (
		<>
			<defs>
				<filter id="wheelBlurTop" height="200%">
					<feOffset dy={30} />
					<feGaussianBlur stdDeviation={10} />
					<feBlend in="SourceGraphic" />
				</filter>
			</defs>
			<rect
				x={0}
				y={-70}
				width={width}
				height={70}
				style={{ fill: "#ddd2", filter: "url(#wheelBlurTop)" }}
			/>
			<rect
				x={0}
				y={-470}
				width={width}
				height={70}
				style={{
					fill: "#000a",
					filter: "url(#wheelBlurTop)",
					transform: `rotate(180deg)`,
					transformOrigin: "50% 0%",
				}}
			/>
		</>
	);
}
