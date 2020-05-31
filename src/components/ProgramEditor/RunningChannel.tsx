import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";

interface RunningChannelProps {
	note: string;
	channel: number;
}

export const RunningChannel = observer((props: RunningChannelProps) => {
	const { editor } = useStores();
	const store = useLocalStore(
		(source) => ({
			get x() {
				return editor.channelToPixel(source.channel);
			},
			get channelOne() {
				// TODO move this away from this component
				return editor.channelToPixel(1);
			},
		}),
		props
	);

	return (
		<g style={{ transform: `translateX(${store.x}px)` }}>
			<rect
				width={store.channelOne}
				height={editor.programEditorHeight}
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
				{props.note}
			</text>
		</g>
	);
});
