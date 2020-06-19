import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import { range } from "../../core/helpers";
import { Fret } from "./Fret";
import { String } from "./String";
import { bassStrings } from "../../core/playback/instruments/instruments";
import { computed, action, observable } from "mobx";

// TODO move these somewhere better (local context)
export const bass = {
	viewWidth: 100,
	viewHeight: 700,
	fretHeight: 30.7,
	totalFrets: 22,
};

@observer
export class Bass extends Component {
	width = 73;
	height = 511;
	fretBoardRef = createRef<SVGSVGElement>();
	@observable mousePos: { x: number; y: number } | undefined;

	fretDatas = range(1, bass.totalFrets + 1).map((n) => {
		let markings: number[] = [];
		if (n === 12) markings = [0.23, 0.77];
		else if (n % 2 === 1 && ![11, 13, 1].includes(n)) markings = [0.5];
		return {
			fret: n,
			markings,
		};
	});

	@action.bound moveMouse(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
		if (!this.fretBoardRef.current) return;
		const svgBound = this.fretBoardRef.current.getBoundingClientRect();
		const x = (e.clientX - svgBound.left) * (bass.viewWidth / this.width);
		const y = (e.clientY - svgBound.top) * (bass.viewHeight / this.height);
		this.mousePos = { x, y };
	}

	render() {
		return (
			<div
				style={{
					border: "1px blue solid",
					// this is here since putting it in the SVG causes poo poo problems
				}}
			>
				<svg
					viewBox="0 0 100 700"
					style={{
						width: this.width,
						height: this.height,
					}}
					ref={this.fretBoardRef}
					onMouseMove={this.moveMouse}
				>
					<rect
						rx={20}
						ry={6}
						width={bass.viewWidth}
						height={bass.viewHeight}
						fill="rgb(241, 221, 189, 1)"
					/>
					{this.fretDatas.map((fretData) => (
						<Fret {...fretData} key={fretData.fret} />
					))}
					{bassStrings.map((string) => (
						<String string={string} key={string} />
					))}
					{/* <rect
						x={this.mousePos?.x}
						y={this.mousePos?.y}
						width={20}
						height={20}
					/> */}
				</svg>
			</div>
		);
	}
}
