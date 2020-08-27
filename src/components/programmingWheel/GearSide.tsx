import gearSideImg from "./woodgear_tileable.png";
import { useContext } from "solid-js";
import { ProgrammingWheelContext } from "./ProgrammingWheel";

export const GearSide = () => {
	const { scroll } = useContext(ProgrammingWheelContext);

	const y = () => scroll.y.toPixel(-scroll.y.visibleLeast()) + 1;
	const scale = () => scroll.y.pixelsPerUnit() * 280 * 3;

	return (
		<div style={{ overflow: "hidden" }}>
			<div
				style={{
					transform: `scaleY(${1})`,
					"background-image": `url("${gearSideImg}")`,
					"background-size": `100% ${scale()}%`,
					height: "100%",
					"background-position": "0px " + y() + "px",
				}}
			/>
		</div>
	);
};
