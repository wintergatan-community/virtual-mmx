import { useStores } from "../../contexts/StoreContext";
import React, { createRef } from "react";
import { range } from "../../core/helpers";
import { ProgramGrid } from "./ProgramGrid";
import { Pegs } from "./Pegs";
import { PegPlacer } from "./PegPlacer";
import { SubdivisonChooser } from "./SubdivisionChooser";
import { GearSide } from "./GearSide";
import { WheelBlur } from "./WheelBlur";
import { observer, useLocalStore } from "mobx-react";

export interface EditorMousePos {
	mouseTick: number;
	mouseChannel: number;
}

export const ProgramEditor = observer(() => {
	const { editor } = useStores();
	const store = useLocalStore(() => ({
		svgRef: createRef<SVGSVGElement>(), // TODO make sure this works, does this even work?

		get tickDivisions() {
			return range(
				0,
				editor.pixelToTick(editor.programEditorWidth),
				editor.ticksPerNoteSubdivision
			);
		},

		mousePos: undefined as EditorMousePos | undefined, // TODO this doesn't seem right

		handleMouseMove(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
			if (!store.svgRef.current) return;
			const svgBound = store.svgRef.current.getBoundingClientRect();
			const x = e.clientX - svgBound.left;
			const looseChannel = editor.pixelToChannel(x);
			const mouseChannel = Math.floor(looseChannel);

			const y = e.clientY - svgBound.top;
			const looseTick = editor.pixelToTick(y);
			const mouseTick =
				Math.floor(looseTick / editor.ticksPerNoteSubdivision) *
				editor.ticksPerNoteSubdivision;

			store.mousePos = { mouseTick, mouseChannel };
		},

		handleScroll(e: React.WheelEvent<SVGSVGElement>) {
			if (e.shiftKey) {
				// e.preventDefault();
				let dy = editor.pixelsPerQuarter - e.deltaY / 20;
				if (dy < 10) dy = 10;
				editor.pixelsPerQuarter = dy; // TODO use action
			} else {
				let dy = editor.viewingEditorTick - e.deltaY / 5;
				if (dy > 0) dy = 0;
				if (dy < -editor.programEditorHeight) dy = -editor.programEditorHeight;
				editor.viewingEditorTick = dy; // TODO use action
			}
		},
	}));

	return (
		<div
			style={{
				width: editor.programEditorWidth,
				height: 400,
				overflow: "hidden",
			}}
		>
			{/* overflow: "scroll" */}
			<svg
				viewBox={`0 0 ${editor.programEditorWidth} ${editor.programEditorHeight}`}
				style={{
					width: editor.programEditorWidth,
					height: editor.programEditorHeight,
				}}
				onMouseMove={store.handleMouseMove}
				onWheel={store.handleScroll}
				ref={store.svgRef}
			>
				<g style={{ transform: `translateY(${editor.viewingEditorTick}px)` }}>
					{/* moving */}
					<ProgramGrid tickDivisions={store.tickDivisions} />
					<Pegs tickDivisions={store.tickDivisions} />
					<PegPlacer mousePos={store.mousePos} />
					<SubdivisonChooser />
					{
						editor.showEmpties ? null : null // TODO, add this thing
					}
					<GearSide x={0} />
					<GearSide x={475} />
				</g>
				<WheelBlur />
			</svg>
		</div>
	);
});
