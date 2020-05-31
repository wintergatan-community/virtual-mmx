import { useStores } from "../../contexts/StoreContext";
import React, { createRef } from "react";
import { ProgramGrid } from "./ProgramGrid";
import { Pegs } from "./Pegs";
import { PegPlacer } from "./PegPlacer";
import { SubdivisonChooser } from "./SubdivisionChooser";
import { GearSide } from "./GearSide";
import { WheelBlur } from "./WheelBlur";
import { observer, useLocalStore } from "mobx-react";
import { action } from "mobx";

export interface EditorMousePos {
	mouseTick: number;
	mouseChannel: number;
}

export const ProgramEditor = observer(() => {
	const { editor } = useStores();
	const store = useLocalStore(() => ({
		svgRef: createRef<SVGSVGElement>(),

		mousePos: undefined as EditorMousePos | undefined,
		setMousePos: action((mousePos: EditorMousePos) => {
			store.mousePos = mousePos;
		}),

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

			store.setMousePos({ mouseTick, mouseChannel });
		},

		handleScroll(e: React.WheelEvent<SVGSVGElement>) {
			if (e.shiftKey) {
				editor.zoom(e.deltaY / 20);
			} else {
				editor.scroll(e.deltaY / 5);
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
				<g style={{ transform: `translateY(${-editor.viewingEditorTick}px)` }}>
					{/* moving */}
					<ProgramGrid />
					<Pegs />
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
