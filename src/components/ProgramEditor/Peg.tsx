import React from "react";
import { mapValue } from "../../core/helpers";
import { ToneDropEvent } from "../../core/playback/events";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";

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
				if (this.dropEvent.kind !== "vibraphone") return null; // TODO other instrument support
				return this.dropEvent.channel;
			},
			get x() {
				return wheel.channelToPixel(this.channel ?? -1); // oh god, im starting to see a problem
			},
			get y() {
				return wheel.tickToPixel(this.tick);
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
		<g style={{ transform: `translate(${store.x}px, ${store.y}px)` }}>
			<rect
				width={store.w}
				height={store.h}
				fill={props.activeDivision ? "#ccc" : "#ccc9"}
				x={store.shift}
				rx={3}
				onClick={props.click}
			/>
		</g>
	);
});
