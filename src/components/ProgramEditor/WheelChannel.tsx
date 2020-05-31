import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";

interface WheelChannelProps {
	descriptor: string;
	channel: number;
}

export const WheelChannel = observer((props: WheelChannelProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get x() {
				return wheel.channelToPixel(source.channel);
			},
			get width() {
				return wheel.tickToPixel(wheel.totalTicks);
			},
			get channelOne() {
				// TODO move this away from this component
				return wheel.channelToPixel(1);
			},
		}),
		props
	);

	return (
		<g style={{ transform: `translateX(${store.x}px)` }}>
			<rect
				width={store.channelOne}
				height={store.width}
				fill="#262421"
				stroke="#101010"
			/>
			<text
				style={{ userSelect: "none" }}
				x={store.channelOne / 2}
				y={20}
				textAnchor="middle"
				dominantBaseline="middle"
				fill="white"
			>
				{props.descriptor}
			</text>
		</g>
	);
});
