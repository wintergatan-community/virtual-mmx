import React, { createRef } from "react";
import { Provider } from "mobx-react";
import { range } from "../../core/helpers";
import { Fret } from "./Fret";
import { String } from "./String";
import { action, observable } from "mobx";
import { AppComponent } from "../storeComponents";
import { BassDisplayStore } from "./bassDisplay";

class Bass_ extends AppComponent {
	bass = new BassDisplayStore();

	width = 73;
	height = 511;
	fretBoardRef = createRef<SVGSVGElement>();
	@observable mousePos: { x: number; y: number } | undefined;

	fretDatas = range(1, this.bass.totalFrets + 1).map((n) => {
		let markings: number[] = [];
		if (n === 12) markings = [0.23, 0.77];
		else if (n % 2 === 1 && ![11, 13, 1].includes(n)) markings = [0.5];
		return {
			fret: n,
			markings,
		};
	});

	@action.bound moveMouse(
		e: React.MouseEvent<SVGSVGElement, MouseEvent>
	): void {
		if (!this.fretBoardRef.current) return;
		const svgBound = this.fretBoardRef.current.getBoundingClientRect();
		const x =
			(e.clientX - svgBound.left) * (this.bass.viewWidth / this.width);
		const y =
			(e.clientY - svgBound.top) * (this.bass.viewHeight / this.height);
		this.mousePos = { x, y };
	}

	render() {
		return (
			<Provider bass={this.bass}>
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
							width={this.bass.viewWidth}
							height={this.bass.viewHeight}
							fill="rgb(241, 221, 189, 1)"
						/>
						{this.fretDatas.map((fretData) => (
							<Fret {...fretData} key={fretData.fret} />
						))}
						{Object.values(
							this.app.program.state.bass.stringStores
						).map((stringStore) => (
							<String
								stringStore={stringStore}
								key={stringStore.string}
							/>
						))}
						{/* <rect
						x={this.mousePos?.x}
						y={this.mousePos?.y}
						width={20}
						height={20}
					/> */}
					</svg>
				</div>
			</Provider>
		);
	}
}

export const Bass = AppComponent.sync(Bass_);
