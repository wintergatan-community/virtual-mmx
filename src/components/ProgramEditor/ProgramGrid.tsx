import React from "react";
import { RunningChannel } from "./RunningChannel";
import { SubdivisionLine } from "./SubdivisionLine";
import { useStores } from "../../contexts/StoreContext";
import { observer } from "mobx-react";

export const ProgramGrid = observer(() => {
	return (
		<>
			<RunningChannels />
			<SubdivisionLines />
		</>
	);
});

const SubdivisionLines = observer(() => {
	const { editor } = useStores();

	return (
		<g>
			{editor.tickDivisions.map((tick) => (
				<SubdivisionLine tick={tick} key={tick} />
			))}
		</g>
	);
});

const RunningChannels = observer(() => {
	const { editor } = useStores();

	return (
		<g>
			{editor.channels.map((note, channel) => (
				<RunningChannel note={note} channel={channel} key={channel} />
			))}
		</g>
	);
});
