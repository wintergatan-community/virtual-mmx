import React, { useContext } from "react";
import { EditorContext } from "../../contexts/EditorContext";

export default function WheelBlur() {
	// shadows not great rn
	const { width } = useContext(EditorContext);

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
				width={width}
				height={70}
				style={{ fill: "#ddd2", filter: "url(#wheelBlurTop)" }}
			/>
			<rect
				x={0}
				y={-470}
				width={width}
				height={70}
				style={{
					fill: "#000a",
					filter: "url(#wheelBlurTop)",
					transform: `rotate(180deg)`,
					transformOrigin: "50% 0%",
				}}
			/>
		</>
	);
}
