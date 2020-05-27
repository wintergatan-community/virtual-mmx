import React, { useContext } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { NoteDivision } from "../../core/types";

export default function SubdivisonChooser() {
	const { noteDivisions } = useContext(EditorContext);

	return (
		<g>
			{Object.keys(noteDivisions).map((division, i) => (
				<SubdivisonOption type={division as NoteDivision} y={i * 40} key={i} />
			))}
		</g>
	);
}

interface SubdivisonOptionProps {
	type: NoteDivision;
	y: number;
}

function SubdivisonOption({ type, y }: SubdivisonOptionProps) {
	const { width, height, setNoteDivision, noteDivisions } = useContext(
		EditorContext
	);
	return (
		<g
			style={{
				transform: `translate(${width - 40}px, ${height - 40 - y}px)`,
				position: "static",
			}}
			onClick={() => {
				setNoteDivision(noteDivisions[type]);
			}}
		>
			<rect width={40} height={40} fill="white" stroke="black" />
			<text x={20} y={20} textAnchor="middle" fontSize={10}>
				{type}
			</text>
		</g>
	);
}
