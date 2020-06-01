import React from "react";
import { VibraphoneChannel } from "vmmx-schema";
import { ToneDropEvent } from "../../core/playback/events";

import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import { TranslateGrid } from "../TranslateGrid";

export const PegPlacer = observer(() => {
	const { global, wheel } = useStores();
	const store = useLocalStore(() => ({
		get mouse() {
			// TODO this doesn't seem right but MobX is being lame
			return wheel.gridSnappedMousePos ?? { mouseTick: -1, mouseChannel: -1 };
		},
		get alreadyPlaced() {
			return global.dropEvents.some(
				(e) =>
					e.dropEvent.kind === "vibraphone" &&
					e.dropEvent.tick === store.mouse.mouseTick &&
					e.dropEvent.channel === store.mouse.mouseChannel
			);
		},
		addPeg() {
			// TODO fix for other instruments
			if (!store.mouse) return;
			const newDropEvent = new ToneDropEvent({
				tick: store.mouse.mouseTick,
				channel: store.mouse.mouseChannel as VibraphoneChannel,
				kind: "vibraphone",
			});
			global.addDropEvent(newDropEvent);
		},
		get height() {
			return wheel.tickToPixel(wheel.ticksPerNoteSubdivision);
		},
	}));

	return store.alreadyPlaced ? null : (
		<TranslateGrid
			tick={store.mouse.mouseTick}
			channel={store.mouse.mouseChannel}
		>
			<rect
				onMouseDown={store.addPeg}
				onMouseMove={(e) => e.buttons === 1 && store.addPeg()}
				width={wheel.channelToPixel(1)}
				height={store.height}
				fill="#0004"
			/>
		</TranslateGrid>
	);
});
