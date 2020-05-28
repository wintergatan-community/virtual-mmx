import React, { useContext } from "react";
import Peg from "./Peg";
import { EditorContext } from "../../contexts/EditorContext";
import { GlobalContext } from "../../contexts/GlobalContext";

interface PegsProps {
	tickDivisions: number[];
}

export default function Pegs({ tickDivisions }: PegsProps) {
	const { player } = useContext(GlobalContext);
	const { dropEvents, noteSubdivision, setDropEvents } = useContext(
		EditorContext
	);

	const visibleStartTick = 0; // TODO correctly
	const visibleEndTick = tickDivisions[tickDivisions.length - 1]; // TODO out of bounds

	const pegs = dropEvents.map((event) => {
		// TODO fix for other instruments
		if (event.dropEvent.kind !== "vibraphone") return null;
		const { tick } = event.dropEvent;
		if (tick > visibleEndTick || tick < visibleStartTick) return null; // TODO optimize

		const removePeg = () => {
			let newTickedDropEvents = dropEvents.filter((e) => e !== event);
			player.removeDropEvent(event);
			console.log("removed " + event.id);
			setDropEvents(newTickedDropEvents);
		};

		return (
			<Peg
				// tick={tick}
				// channel={channel}
				toneDropEvent={event}
				activeDivision={tick % noteSubdivision === 0}
				spawnsEvent={true}
				click={removePeg}
				key={event.id}
			/>
		);
	});

	return <>{pegs}</>;
}
