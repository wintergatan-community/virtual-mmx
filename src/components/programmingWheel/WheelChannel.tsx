import { ChannelPegs } from "./ChannelPegs";
import { ChannelColor, DisplayChannel } from "./programmingWheelDisplay";
import { useContext } from "solid-js";
import { Signal } from "../../core/helpers/solid";
import { TranslateOnScroll } from "../Scroll";
import { ProgrammingWheelContext } from "./ProgrammingWheel";

interface WheelChannelProps {
	displayChannel: DisplayChannel;
	channelNumber: Signal<number>;
	channelColor: ChannelColor;
}

export const WheelChannel = (props: WheelChannelProps) => {
	const { wheel, scroll } = useContext(ProgrammingWheelContext);

	return (
		<TranslateOnScroll scroll={scroll} axis="x" by={props.channelNumber}>
			<rect
				width={scroll.x.toPixel(1)}
				height={scroll.y.toPixel(wheel.totalTicks()) * 2}
				fill={props.channelColor}
				stroke="rgb(47, 47, 47)"
			/>
			<ChannelPegs timeline={props.displayChannel.timeline} />
		</TranslateOnScroll>
	);
};
