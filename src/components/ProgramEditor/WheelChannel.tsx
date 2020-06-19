import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";
import PartData from "../../core/playback/partData";
import { ChannelPegs } from "./ChannelPegs";
import { TranslateGrid } from "./TranslateGrid";

interface WheelChannelProps {
	data: PartData;
	channel: number;
}

export const WheelChannel = observer((props: WheelChannelProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get partData() {
				return wheel.pegChannelDatas[source.channel].partData;
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
		<TranslateGrid channel={props.channel}>
			<rect
				width={store.channelOne}
				height={store.width}
				fill="rgb(39, 39, 39)"
				stroke="rgb(47, 47, 47)"
			/>
			<ChannelPegs pegs={store.partData.pegs} channel={props.channel} />
		</TranslateGrid>
	);
});
