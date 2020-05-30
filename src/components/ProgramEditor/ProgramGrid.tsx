import React from "react";
import { RunningChannel } from "./RunningChannel";
import { SubdivisionLine } from "./SubdivisionLine";
import { useStores } from "../../contexts/StoreContext";
import { observer } from "mobx-react";

interface ProgramGridProps {
	tickDivisions: number[];
}

export const ProgramGrid = observer(({ tickDivisions }: ProgramGridProps) => {
	return (
		<>
			<SubdivisionLines tickDivisions={tickDivisions} />
			<RunningChannels />
		</>
	);
});

const SubdivisionLines = observer(({ tickDivisions }: ProgramGridProps) => {
	// TODO maybe move tickDivisions or props name
	return (
		<>
			{tickDivisions.map((tick, i) => (
				<SubdivisionLine tick={tick} key={i} />
			))}
		</>
	);
});

const RunningChannels = observer(() => {
	const { editor } = useStores();
	return (
		<>
			{editor.channels.map((note, channel) => (
				<RunningChannel note={note} channel={channel} key={channel} />
			))}
		</>
	);
});
