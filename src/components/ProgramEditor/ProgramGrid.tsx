import React, { useContext } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import RunningChannel from "./RunningChannel";
import SubdivisionLine from "./SubdivisionLine";

interface ProgramGridProps {
	tickDivisions: number[];
}

export default function ProgramGrid({ tickDivisions }: ProgramGridProps) {
	const { channels } = useContext(EditorContext);

	return (
		<>
			{channels.map((note, channel) => (
				<RunningChannel note={note} channel={channel} key={channel} />
			))}
			{tickDivisions.map((tick, i) => (
				<SubdivisionLine tick={tick} key={i} />
			))}
		</>
	);
}
