import React from "react";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import { TranslateGrid } from "../TranslateGrid";

export const PegPlacer = observer(() => {
	const { wheel } = useStores();
	const store = useLocalStore(() => ({
		get partData() {
			const channel = wheel.gridSnappedMousePos?.mouseChannel;
			if (!channel) return null;
			return wheel.partData[channel];
		},
		get mouse() {
			// TODO this doesn't seem right but MobX is being lame
			return wheel.gridSnappedMousePos ?? { mouseTick: -1, mouseChannel: -1 };
		},
		get alreadyPlaced() {
			if (!store.partData) return true;
			return store.partData.pegs.some((p) => p.tick === store.mouse.mouseTick);
		},
		addPeg() {
			if (!store.mouse) return;
			store.partData?.add(store.mouse.mouseTick);
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
