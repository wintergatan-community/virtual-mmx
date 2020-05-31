import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";

interface SubdivisionLineProps {
	tick: number;
}

export const SubdivisionLine = observer((props: SubdivisionLineProps) => {
	const { editor } = useStores();
	const store = useLocalStore(
		(source) => ({
			get y() {
				return editor.tickToPixel(source.tick);
			},
			get stroke() {
				return editor.scoreDivisionChecker(source.tick).stroke;
			},
			get strokeWidth() {
				return editor.scoreDivisionChecker(source.tick).strokeWidth;
			},
		}),
		props
	);

	return (
		<g style={{ transform: `translateY(${store.y}px)` }}>
			<line
				x1={0}
				x2={editor.programEditorWidth}
				stroke={store.stroke}
				strokeWidth={store.strokeWidth}
			/>
		</g>
	);
});
