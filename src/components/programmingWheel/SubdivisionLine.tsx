import { useContext } from "solid-js";
import { ProgrammingWheelContext } from "./ProgrammingWheel";
import { TranslateOnScroll } from "../Scroll";

interface SubdivisionLineProps {
	tick: number;
}

export const SubdivisionLine = (props: SubdivisionLineProps) => {
	const { wheel, scroll } = useContext(ProgrammingWheelContext);

	const lineStyle = () => wheel.subdivisionLineFunction()(props.tick);

	return (
		<TranslateOnScroll scroll={scroll} axis="y" by={() => props.tick}>
			<line
				x2={scroll.x.visiblePixelRange()}
				stroke={lineStyle().stroke}
				strokeWidth={lineStyle().strokeWidth}
			/>
		</TranslateOnScroll>
	);
};
