import React from "react";
import { WheelMousePos } from "./ProgrammingWheel";
import { VibraphoneChannel } from "vmmx-schema";
import { ToneDropEvent } from "../../core/playback/events";

import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";

interface PegPlacerProps {
	mousePos?: WheelMousePos;
}

export const PegPlacer = observer((props: PegPlacerProps) => {
	const { global, wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			// if (!mousePos) return null;

			get mouseTick() {
				if (!source.mousePos) return -1; // maybe not this way
				return source.mousePos.mouseTick;
			},
			get mouseChannel() {
				if (!source.mousePos) return -1; // maybe not this way
				return source.mousePos.mouseChannel;
			},
			// TODO speed up
			get alreadyPlaced() {
				return global.dropEvents.some(
					(e) =>
						e.dropEvent.kind === "vibraphone" &&
						e.dropEvent.tick === store.mouseTick &&
						e.dropEvent.channel === store.mouseChannel
				);
			},
			addPeg() {
				// TODO fix for other instruments
				const newDropEvent = new ToneDropEvent({
					tick: store.mouseTick,
					channel: store.mouseChannel as VibraphoneChannel,
					kind: "vibraphone",
				});
				global.addDropEvent(newDropEvent);
			},

			get x() {
				return wheel.channelToPixel(store.mouseChannel);
			},
			get y() {
				return wheel.tickToPixel(store.mouseTick);
			},
			get height() {
				return wheel.tickToPixel(wheel.ticksPerNoteSubdivision);
			},
		}),
		props
	);

	return store.alreadyPlaced ? null : (
		<g>
			<rect
				style={{
					transform: `translate(${store.x}px, ${store.y}px)`,
				}}
				onMouseDown={store.addPeg}
				onMouseMove={(e) => e.buttons === 1 && store.addPeg()}
				width={wheel.channelToPixel(1)}
				height={store.height}
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
});
