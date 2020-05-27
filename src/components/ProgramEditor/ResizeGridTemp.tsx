import React, { useContext } from "react";
import { EditorContext } from "../../contexts/EditorContext";

interface ResizeGridTempProps {
	x: number;
	y: number;
}

export default function ResizeGridTemp({ x, y }: ResizeGridTempProps) {
	const { spacing, setSpacing } = useContext(EditorContext);
	return (
		<g style={{ transform: `translate(${x}px, ${y}px)` }}>
			<rect
				width={40}
				height={40}
				fill="#0000"
				stroke="black"
				onWheel={(e) => {
					let newSpacing = spacing + e.deltaY / 20;
					if (newSpacing < 10) newSpacing = 10;
					setSpacing(newSpacing);
				}}
			/>
		</g>
	);
}
