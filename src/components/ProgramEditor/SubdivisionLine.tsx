import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";

interface SubdivisionLineProps {
	tick: number;
}

export const SubdivisionLine = observer((props: SubdivisionLineProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get y() {
				return wheel.tickToPixel(source.tick);
			},
			get stroke() {
				return wheel.subdivisionLineFunction(source.tick).stroke;
			},
			get strokeWidth() {
				return wheel.subdivisionLineFunction(source.tick).strokeWidth;
			},
		}),
		props
	);

	return (
		<g style={{ transform: `translateY(${store.y}px)` }}>
			<line
				x1={0}
				x2={wheel.visiblePixelWidth}
				stroke={store.stroke}
				strokeWidth={store.strokeWidth}
			/>
		</g>
	);
});
