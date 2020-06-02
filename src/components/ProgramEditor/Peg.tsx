import React from "react";
import { mapValue } from "../../core/helpers";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import { TranslateGrid } from "./TranslateGrid";
import { PegInPart } from "../../core/playback/partData";

interface PegProps {
	peg: PegInPart;
	channel: number;
	activeDivision: boolean;
	spawnsEvent: boolean;
	click?: () => void;
}

export const Peg = observer((props: PegProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get tick() {
				return source.peg.tick;
			},
			get w() {
				return 10;
			},
			get h() {
				return Math.min(
					20,
					Math.max(wheel.tickToPixel(wheel.ticksPerNoteSubdivision) - 5, 5)
				);
			},
			get shift() {
				return mapValue(
					wheel.pegOffsetFunction(this.tick),
					0,
					1,
					0,
					wheel.channelToPixel(1) - this.w
				);
			},
		}),
		props
	);

	return (
		<TranslateGrid tick={store.tick}>
			<rect
				width={store.w}
				height={store.h}
				fill={props.activeDivision ? "#ccc" : "#ccc9"}
				x={store.shift}
				rx={3}
				onClick={props.click}
			/>
		</TranslateGrid>
	);
});
