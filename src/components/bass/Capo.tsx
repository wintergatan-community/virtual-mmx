import React, { createRef } from "react";
import { computed, action } from "mobx";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { BassComponent } from "../storeComponents";
import { BassStringStore } from "../../stores/bass";

interface CapoProps {
	stringStore: BassStringStore;
}

class Capo_ extends BassComponent<CapoProps> {
	capoSVGRef = createRef<SVGRectElement>();

	@computed get capo(): number {
		return this.props.stringStore.capo;
	}

	@action.bound moveCapo(_: DraggableEvent, data: DraggableData): void {
		const fret = Math.ceil(
			(data.y / this.bass.viewHeight) * this.bass.totalFrets
		);
		if (this.capo === fret) return;
		// console.log(this.props.string + ": " + fret);
		this.props.stringStore.moveCapo(fret);
	}

	scale(num: number): number {
		return (num * 511) / 700;
	}

	render(): JSX.Element {
		return (
			<Draggable
				axis="y"
				defaultPosition={{ x: 0, y: 0 }}
				// grid={[0, x]}
				bounds={{
					top: 0,
					bottom: this.bass.viewHeight,
				}}
				scale={this.scale(1)}
				onDrag={this.moveCapo}
				nodeRef={
					(this.capoSVGRef as unknown) as React.RefObject<HTMLElement>
				} // TODO stupid react, typescript, library nothing works shut up do your job
			>
				<g>
					<rect
						x={-10}
						y={this.capo - 6}
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

export const Capo = BassComponent.sync(Capo_);
