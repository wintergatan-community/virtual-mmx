import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";
import PartData from "../../core/playback/partData";
import { ChannelPegs } from "./ChannelPegs";

interface WheelChannelProps {
	data: PartData;
	channel: number;
}

export const WheelChannel = observer((props: WheelChannelProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get partData() {
				return wheel.partData[source.channel];
			},
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
				{props.data.descriptor}
			</text>
			<ChannelPegs pegs={store.partData.pegs} channel={props.channel} />
		</g>
	);
});
