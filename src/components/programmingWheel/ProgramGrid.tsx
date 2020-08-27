import { WheelChannel } from "./WheelChannel";
import { SubdivisionLine } from "./SubdivisionLine";
import { useContext, For } from "solid-js";
import { ProgrammingWheelContext } from "./ProgrammingWheel";
import { TranslateOnScroll } from "../Scroll";

export const ProgramGrid = () => {
	return (
		<>
			<WheelChannels />
			<SubdivisionLines />
		</>
	);
};

export const SubdivisionLines = () => {
	const { wheel, scroll } = useContext(ProgrammingWheelContext);

	const linesVisible = scroll.y.visibleArrayOf(
		wheel.subdivisionLines,
		(s) => s
	);

	const circularLinesVisible = scroll.y.visibleArrayOf(
		wheel.subdivisionLines,
		(s) => s,
		"circular"
	);

	return (
		<g>
			<For each={linesVisible()}>
				{(tick) => <SubdivisionLine tick={tick} />}
			</For>
			<TranslateOnScroll scroll={scroll} axis="y" by={scroll.y.total}>
				<For each={circularLinesVisible()}>
					{(tick) => <SubdivisionLine tick={tick} />}
				</For>
			</TranslateOnScroll>
		</g>
	);
};

export const WheelChannels = () => {
	const { wheel } = useContext(ProgrammingWheelContext);

	// const dataVisible = scroll.x.visibleArray(wheel.instrumentChannels, (_, i) => i);

	return (
		<g>
			<For each={wheel.instrumentChannels()}>
				{(channel, channelNumber) => (
					<WheelChannel
						displayChannel={channel}
						channelNumber={channelNumber}
						channelColor={channel.channelColor}
					/>
				)}
			</For>
		</g>
	);
};
