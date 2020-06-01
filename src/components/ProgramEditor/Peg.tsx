import React from "react";
import { mapValue } from "../../core/helpers";
import { ToneDropEvent } from "../../core/playback/events";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import { TranslateGrid } from "../TranslateGrid";

interface PegProps {
	toneDropEvent: ToneDropEvent;
	activeDivision: boolean;
	spawnsEvent: boolean;
	click?: () => void;
}

export const Peg = observer((props: PegProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get dropEvent() {
				return source.toneDropEvent.dropEvent;
			},

			get tick() {
				return this.dropEvent.tick;
			},
			get channel() {
				if (this.dropEvent.kind !== "vibraphone") return -1; // TODO other instrument support
				return this.dropEvent.channel;
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
				); //channelToPixel(1) / 2 - w/2
			},
		}),
		props
	);

	return (
		<TranslateGrid tick={store.tick} channel={store.channel}>
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
