import { useContext } from "solid-js";
import { ProgrammingWheelContext } from "./ProgrammingWheel";

export const Blur = () => {
	const { scroll } = useContext(ProgrammingWheelContext);
	// TODO shadows still need work
	return (
		<>
			<defs>
				<filter id="wheelBlurTop" height="200%">
					<feOffset dy={30} />
					<feGaussianBlur stdDeviation={10} />
					<feBlend in="SourceGraphic" />
				</filter>
			</defs>
			<rect
				x={0}
				y={-70}
				width={scroll.x.visiblePixelRange()}
				height={70}
				style={{ fill: "#ddd2", filter: "url(#wheelBlurTop)" }}
			/>
			<rect
				x={0}
				y={-70 - scroll.y.visiblePixelRange()}
				width={scroll.x.visiblePixelRange()}
				height={70}
				style={{
					fill: "#000a",
					filter: "url(#wheelBlurTop)",
					transform: `rotate(180deg)`,
					"transform-origin": "50% 0%",
				}}
			/>
		</>
	);
};
