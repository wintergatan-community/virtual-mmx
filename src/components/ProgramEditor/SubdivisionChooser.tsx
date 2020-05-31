import React from "react";
import { NoteSubdivision } from "../../core/types";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";

export const SubdivisonChooser = observer(() => {
	const { editor } = useStores();

	return (
		<g>
			{Object.keys(editor.ticksPerNoteSubdivisions).map((division, i) => (
				<SubdivisonOption
					type={division as NoteSubdivision}
					y={i * 40}
					key={division}
				/>
			))}
		</g>
	);
});

interface SubdivisonOptionProps {
	type: NoteSubdivision;
	y: number;
}

export const SubdivisonOption = observer((props: SubdivisonOptionProps) => {
	const { editor } = useStores();
	const store = useLocalStore(() => ({
		handleClick() {
			editor.setSubdivision(props.type);
		},
		get x() {
			return editor.channelWidth - 40;
		},
		get y() {
			return editor.programEditorHeight - 40 - props.y;
		},
	}));

	return (
		<g
			style={{
				transform: `translate(${store.x}px, ${store.y}px)`,
				position: "static", // TODO unneeded?
			}}
			onClick={store.handleClick}
		>
			<rect width={40} height={40} fill="white" stroke="black" />
			<text x={20} y={20} textAnchor="middle" fontSize={10}>
				{props.type}
			</text>
		</g>
	);
});
