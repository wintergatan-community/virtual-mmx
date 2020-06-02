import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import { TranslateGrid } from "./TranslateGrid";

export const PlaybackHead = observer(() => {
	const { wheel } = useStores();
	return (
		<TranslateGrid tick={wheel.playbackHeadTick}>
			<line
				x1={0}
				x2={wheel.visiblePixelWidth}
				y1={0}
				y2={0}
				stroke="green"
				strokeWidth={1.5}
			/>
		</TranslateGrid>
	);
});
