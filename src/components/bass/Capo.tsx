import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import { computed, action } from "mobx";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { BassString } from "vmmx-schema";
import { global } from "../../contexts/StoreContext";
import { bass } from "./Bass";

interface CapoProps {
	string: BassString;
}

@observer
export class Capo extends Component<CapoProps> {
	capoSVGRef = createRef<SVGRectElement>();

	@computed get capoPos() {
		return global.program.state.bass.capos[this.props.string] ?? 0;
	}

	@action.bound moveCapo(_: DraggableEvent, data: DraggableData) {
		let fret = Math.ceil((data.y / bass.viewHeight) * bass.totalFrets);
		if (this.capoPos === fret) return;
		// console.log(this.props.string + ": " + fret);
		this.setCapoFret(fret);
	}

	@action setCapoFret(fret: number) {
		global.program.state.bass.capos[this.props.string] = fret;
	}

	scale(num: number) {
		return (num * 511) / 700;
	}

	render() {
		return (
			<Draggable
				axis="y"
				defaultPosition={{ x: 0, y: 0 }}
				// grid={[0, x]}
				bounds={{ top: 0, bottom: bass.viewHeight }}
				scale={this.scale(1)}
				onDrag={this.moveCapo}
				nodeRef={(this.capoSVGRef as unknown) as React.RefObject<HTMLElement>} // TODO stupid react, typescript, library nothing works shut up do your job
			>
				<g>
					<rect
						x={-10}
						y={this.capoPos - 6}
						width={22}
						height={12}
						rx={3}
						fill="rgb(165, 178, 197)"
					/>
					<rect
						ref={this.capoSVGRef}
						x={-13.5}
						y={-15}
						width={27}
						height={30}
						fill="#0000"
					/>
				</g>
			</Draggable>
		);
	}
}
