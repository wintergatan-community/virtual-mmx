// import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { BassStringStore } from "../../stores/bass";
import { SpringPulse } from "../../core/helpers/springPulse";
import { createEffect, useContext } from "solid-js";
import { BassContext } from "./Bass";

interface CapoProps {
	stringStore: BassStringStore;
}

const Capo = (props: CapoProps) => {
	const { bass } = useContext(BassContext);
	const capoFluid = new SpringPulse();

	capoFluid.stiffness = 1000;
	capoFluid.damping = 50;

	const capo = () => props.stringStore.capo;

	createEffect(() => {
		capoFluid.moveTo(bass.fretToPixel(capo()));
	});

	// function moveCapo(_: DraggableEvent, data: DraggableData) {
	// 	const fret = Math.ceil((data.y / bass.viewHeight) * bass.totalFrets);
	// 	if (capo() === fret) return;
	// 	props.stringStore.moveCapo(fret);
	// }

	let capoSVGRef: SVGRectElement;
	const jsx = <></>;
	// 	<Draggable
	// 		axis="y"
	// 		defaultPosition={{ x: 0, y: 0 }}
	// 		position={{ x: 0, y: capoFluid.value }}
	// 		// grid={[0, x]}
	// 		bounds={{
	// 			top: 0,
	// 			bottom: bass.viewHeight,
	// 		}}
	// 		onDrag={moveCapo}
	// 		nodeRef={(capoSVGRef as unknown) as React.RefObject<HTMLElement>} // TODO stupid react, typescript, library nothing works shut up do your job
	// 	>
	// 		<g>
	// 			<rect
	// 				x={-10}
	// 				y={capo - 6}
	// 				width={22}
	// 				height={12}
	// 				rx={3}
	// 				fill="rgb(165, 178, 197)"
	// 			/>
	// 			<rect
	// 				ref={capoSVGRef}
	// 				x={-13.5}
	// 				y={-15}
	// 				width={27}
	// 				height={30}
	// 				fill="#0000"
	// 			/>
	// 		</g>
	// 	</Draggable>
	// );
	// mouse.setElement();
	return jsx;
};
