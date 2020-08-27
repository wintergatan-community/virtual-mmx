import { useContext } from "solid-js";
import { TranslateOnScroll } from "../Scroll";
import { ProgrammingWheelContext } from "./ProgrammingWheel";

export const PlaybackHead = () => {
	const { wheel, scroll } = useContext(ProgrammingWheelContext);

	return (
		<TranslateOnScroll scroll={scroll} axis="y" by={wheel.playbackHeadTick}>
			<line
				x2={scroll.x.visiblePixelRange()}
				stroke="green"
				strokeWidth={1.5}
			/>
		</TranslateOnScroll>
	);
};
