import React from "react";
import { EditorMousePos } from "./ProgramEditor";
import { VibraphoneChannel } from "vmmx-schema";
import { ToneDropEvent } from "../../core/playback/events";

import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";

interface PegPlacerProps {
	mousePos?: EditorMousePos;
}

export const PegPlacer = observer((props: PegPlacerProps) => {
	const { global, editor } = useStores();
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
				return editor.channelToPixel(store.mouseChannel);
			},
			get y() {
				return editor.tickToPixel(store.mouseTick);
			},
			get height() {
				return editor.tickToPixel(editor.ticksPerNoteSubdivision);
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
				width={editor.channelToPixel(1)}
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
