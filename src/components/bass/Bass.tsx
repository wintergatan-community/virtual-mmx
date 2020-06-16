import React, { Component } from "react";
import { observer } from "mobx-react";
import { range } from "../../core/helpers";
import { BassString } from "vmmx-schema";
import { Fret } from "./Fret";
import { String } from "./String";

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

	strings: BassString[] = [1, 2, 3, 4]; // TODO this should be in schema

	fretDatas = range(1, bass.totalFrets + 1).map((n) => {
		let markings: number[] = [];
		if (n === 12) markings = [0.25, 0.75];
		else if (n % 2 === 1 && ![11, 13, 1].includes(n)) markings = [0.5];
		return {
			fret: n,
			markings,
		};
	});

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
					{this.strings.map((string) => (
						<String string={string} key={string} />
					))}
				</svg>
			</div>
		);
	}
}
