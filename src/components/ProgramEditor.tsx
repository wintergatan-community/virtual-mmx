import React, { useContext, useState } from "react";
import { EditorContext } from "../contexts/EditorContext";
import { range } from "../core/helpers";
import { RunningChannel } from "./RunningChannel";
import { ResizeGridTemp } from "./ResizeGridTemp";
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
	} = useContext(EditorContext);

	const channels = ["A", "B", "C", "D", "E", "F", "G", "A"]; // nonsense for testing
	const tickDivisions = range(0, pixelToTick(width), noteDivision);
	const visibleStartTick = 0; // TODO correctly
	const visibleEndTick = tickDivisions[tickDivisions.length - 1]; // TODO out of bounds

	const [mousePos, setMousePos] = useState<MarbleEvent>();

	const updateMousePos = (e: any) => {
		const x = e.clientX - 8; // - e.target.getBoundingClientRect().left TODO fix
		const looseChannel = pixelToChannel(x);
		const channel = Math.floor(looseChannel);

		const y = e.clientY - 8; // - e.target.getBoundingClientRect().left TODO fix
		const looseTick = pixelToTick(y);
		const tick = Math.floor(looseTick / noteDivision) * noteDivision;

		// if(Math.abs(tick - looseTick) > 3) return setMousePos(undefined)

		setMousePos({ tick, channel });
	};

	return (
		<svg
			viewBox={`0 0 ${width} ${height}`}
			style={{ width, height, border: "black 2px solid" }}
			onMouseMove={updateMousePos}
		>
			{channels.map((note, channel) => (
				<RunningChannel note={note} channel={channel} key={channel} />
			))}
			{tickDivisions.map((tick, i) => (
				<SubdivisionLine tick={tick} key={i} />
			))}
			{marbleEvents.map((event, i) => {
				const { tick, channel } = event;
				if (tick > visibleEndTick || tick < visibleStartTick) return null; // TODO optimize

				const remove = () => {
					let newMarbleEvents = marbleEvents.filter((e) => e !== event);
					setMarbleEvents(newMarbleEvents);
				};

				return (
					<Peg
						tick={tick}
						channel={channel}
						key={i}
						activeDivision={tick % noteDivision === 0}
						click={remove}
					/>
				);
			})}
			{(() => {
				// TODO this is ugly and needs to get out of a IIEF
				if (!mousePos) return;
				const { tick, channel } = mousePos;
				if (marbleEvents.some((e) => e.tick === tick && e.channel === channel))
					return null;
				return (
					<Peg
						tick={tick}
						channel={channel}
						activeDivision={false}
						click={() => {
							const newMarbleEvents = marbleEvents.concat({ tick, channel });
							newMarbleEvents.sort((a, b) => a.tick - b.tick);
							setMarbleEvents(newMarbleEvents);
						}}
					/>
				);
			})()}
			<ResizeGridTemp x={0} y={0} />
			<SubdivisonChooser />
			{
				showEmpties ? null : null // TODO, add this thing
			}
		</svg>
	);
}
