import React, { useContext, useRef, useState } from "react";
import { EditorContext } from "../../contexts/EditorContext";
import { range } from "../../core/helpers";
import PegPlacer from "./PegPlacer";
import SubdivisonChooser from "./SubdivisionChooser";
import GearSide from "./GearSide";
import WheelBlur from "./WheelBlur";
import Pegs from "./Pegs";
import ProgramGrid from "./ProgramGrid";

export interface EditorMousePos {
	mouseTick: number;
	mouseChannel: number;
}

export default function ProgramEditor() {
	const {
		width,
		height,
		pixelToTick,
		pixelToChannel,
		noteSubdivision,
		showEmpties,
		spacing,
		setSpacing,
		viewingEditorTick,
		setViewingEditorTick,
	} = useContext(EditorContext);

	const svgRef = useRef<SVGSVGElement>(null);

	const tickDivisions = range(0, pixelToTick(width), noteSubdivision);

	const [mousePos, setMousePos] = useState<EditorMousePos>();

	const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
		if (!svgRef.current) return;
		const svgBound = svgRef.current.getBoundingClientRect();
		const x = e.clientX - svgBound.left;
		const looseChannel = pixelToChannel(x);
		const mouseChannel = Math.floor(looseChannel);

		const y = e.clientY - svgBound.top;
		const looseTick = pixelToTick(y);
		const mouseTick = Math.floor(looseTick / noteSubdivision) * noteSubdivision;

		setMousePos({ mouseTick, mouseChannel });
	};

	const handleScroll = (e: React.WheelEvent<SVGSVGElement>) => {
		if (e.shiftKey) {
			// e.preventDefault();
			let dy = spacing - e.deltaY / 20;
			if (dy < 10) dy = 10;
			setSpacing(dy);
		} else {
			let dy = viewingEditorTick - e.deltaY / 5;
			if (dy > 0) dy = 0;
			if (dy < -height) dy = -height;
			setViewingEditorTick(dy);
		}
	};

	return (
		<div style={{ width, height: 400, overflow: "hidden" }}>
			{/* overflow: "scroll" */}
			<svg
				viewBox={`0 0 ${width} ${height}`}
				style={{ width, height }}
				onMouseMove={handleMouseMove}
				onWheel={handleScroll}
				ref={svgRef}
			>
				<g style={{ transform: `translateY(${viewingEditorTick}px)` }}>
					{/* moving */}
					<ProgramGrid tickDivisions={tickDivisions} />
					<Pegs tickDivisions={tickDivisions} />
					<PegPlacer mousePos={mousePos} />
					<SubdivisonChooser />
					{
						showEmpties ? null : null // TODO, add this thing
					}
					<GearSide x={0} />
					<GearSide x={475} />
				</g>
				<WheelBlur />
			</svg>
		</div>
	);
}
