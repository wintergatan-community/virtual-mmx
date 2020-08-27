import { SubdivisionChooser } from "./SubdivisionChooser";
import { useContext } from "solid-js";
import { ProgrammingWheelContext } from "../ProgrammingWheel";

export const BottomBar = () => {
	return (
		<div
			style={{
				display: "flex",
				"align-items": "center",
				"justify-content": "flex-end",
				"background-color": "rgb(210, 210, 210)",
				width: "100%",
			}}
		>
			<SubdivisionChooser />
		</div>
	);
};
