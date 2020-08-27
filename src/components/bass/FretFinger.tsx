import { useContext } from "solid-js";
import { BassContext } from "./Bass";

export const FretFinger = () => {
	const { bass, mouse } = useContext(BassContext);

	const x = () => {
		const mouseX = mouse.mousePos()?.x;
		if (!mouseX) return 0;
		return bass.stringToPixel(Math.round(bass.pixelToString(mouseX)));
	};
	const y = () => {
		const mouseY = mouse.mousePos()?.y;
		if (!mouseY) return 0;

		return (
			bass.fretToPixel(Math.ceil(bass.pixelToFret(mouseY))) -
			bass.fretHeight() / 2
		);
	};

	return (
		<circle
			style={{ "pointer-events": "none", transition: `0.2s` }}
			cx={x()}
			cy={y()}
			r={10}
			fill={true ? "black" : "white"}
		/>
	);
};
