import { EditorMousePos } from "./ProgramEditor";
import React, { useContext } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { VibraphoneChannel } from "vmmx-schema";
import { ToneDropEvent } from "../../core/playback/events";
import { GlobalContext } from "../../contexts/GlobalContext";

interface PegPlacerProps {
	mousePos?: EditorMousePos;
}

export default function PegPlacer({ mousePos }: PegPlacerProps) {
	const { player, tpq } = useContext(GlobalContext);
	const { dropEvents, setDropEvents, channelToPixel, tickToPixel } = useContext(
		EditorContext
	);

	if (!mousePos) return null;
	const { mouseTick, mouseChannel } = mousePos;
	// TODO speed up
	const alreadyPlaced = dropEvents.some(
		(e) =>
			e.dropEvent.kind === "vibraphone" &&
			e.dropEvent.tick === mouseTick &&
			e.dropEvent.channel === mouseChannel
	);
	if (alreadyPlaced) return null;

	const addPeg = () => {
		// TODO fix for other instruments
		const newDropEvent = new ToneDropEvent({
			tick: mouseTick,
			channel: mouseChannel as VibraphoneChannel,
			kind: "vibraphone",
		});
		const newDropEvents = dropEvents.concat(newDropEvent);
		player.addDropEvent(newDropEvent);
		console.log("created " + newDropEvent.id);
		newDropEvents.sort((a, b) => a.dropEvent.tick - b.dropEvent.tick);
		// TODO optimize

		setDropEvents(newDropEvents);
	};

	const x = channelToPixel(mouseChannel);
	const y = tickToPixel(mouseTick);

	return (
		<g>
			<rect
				style={{
					transform: `translate(${x}px, ${y}px)`,
				}}
				onClick={addPeg}
				width={channelToPixel(1)}
				height={tickToPixel(tpq)}
				fill="#0004"
			/>
			{/* <Peg
				tick={mouseTick}
				channel={mouseChannel}
				spawnsEvent={false}
				activeDivision={mouseTick % noteSubdivision === 0}
			/> */}
		</g>
	);
}
