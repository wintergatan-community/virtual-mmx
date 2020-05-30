import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer } from "mobx-react";

export const WheelBlur = observer(() => {
	// shadows not great rn
	const { editor } = useStores();

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
				width={editor.programEditorWidth}
				height={70}
				style={{ fill: "#ddd2", filter: "url(#wheelBlurTop)" }}
			/>
			<rect
				x={0}
				y={-470}
				width={editor.programEditorWidth}
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
});
