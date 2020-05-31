import { useStores } from "../../contexts/StoreContext";
import React, { createRef } from "react";
import { ProgramGrid } from "./ProgramGrid";
import { Pegs } from "./Pegs";
import { PegPlacer } from "./PegPlacer";
import { SubdivisonChooser } from "./SubdivisionChooser";
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
			const looseTick =
				(editor.pixelToTick(y) + editor.viewingEditorTick) %
				editor.pixelToTick(editor.programEditorHeight);
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
		get y() {
			return editor.tickToPixel(editor.viewingEditorTick);
		},
	}));

	return (
		<div
			style={{
				width: editor.programEditorWidth,
				height: editor.programEditorVisibleHeight,
				overflow: "hidden",
			}}
		>
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
				<g style={{ transform: `translateY(${-store.y}px)` }}>
					<MovingWindow m={store.mousePos} />
					<g
						style={{
							transform: `translateY(${editor.programEditorHeight}px)`,
						}}
					>
						<MovingWindow m={store.mousePos} />
					</g>
				</g>
				<WheelBlur />
			</svg>
		</div>
	);
});

function MovingWindow(props: { m: EditorMousePos | undefined }) {
	const { editor } = useStores();
	return (
		<>
			<ProgramGrid />
			<Pegs />
			<PegPlacer mousePos={props.m} />
			<SubdivisonChooser />
			{
				editor.showEmpties ? null : null // TODO, add this thing
			}
			{/* <GearSide x={0} />
			<GearSide x={editor.programEditorWidth - 20} /> */}
			<line x1={0} y1={0} x2={editor.programEditorWidth} y2={0} stroke="red" />
		</>
	);
}
