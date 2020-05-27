import React, { useContext } from "react";
import { EditorContext } from "../../contexts/EditorContext";

interface RunningChannelProps {
	note: string;
	channel: number;
}

export function RunningChannel({ channel, note }: RunningChannelProps) {
	const { height, textColor, channelToPixel } = useContext(EditorContext);
	const x = channelToPixel(channel);
	const channelOne = channelToPixel(1);

	return (
		<g style={{ transform: `translateX(${x}px)` }}>
			<text
				x={channelOne}
				y={20}
				textAnchor="middle"
				dominantBaseline="middle"
				fill={textColor}
			>
				{note}
			</text>
			<rect
				width={channelOne}
				height={height}
				fill="#262421"
				stroke="#101010"
			/>
		</g>
	);
}
