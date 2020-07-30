import React, { createRef } from "react";
import { Provider } from "mobx-react";
import { range } from "../../core/helpers/functions";
import { Fret } from "./Fret";
import { String } from "./String";
import { AppComponent } from "../storeComponents";
import { BassDisplayStore } from "./bassDisplay";
import { FretFinger } from "./FretFinger";
import { action, computed } from "mobx";
import { BassString } from "vmmx-schema";
import { BassStringStore } from "../../stores/bass";

class Bass_ extends AppComponent {
	bass = new BassDisplayStore();

	fretBoardRef = createRef<SVGSVGElement>();

	fretDatas = range(1, this.bass.totalFrets + 1).map((n) => {
		let markings: number[] = [];
		if (n === 12) markings = [1.5, 3.5];
		else if (n % 2 === 1 && ![11, 13, 1].includes(n)) markings = [2.5];
		return {
			fret: n,
			markings,
		};
	});

	@computed get hoveredString(): BassStringStore | undefined {
		if (!this.bass.mouseTracker.mousePos) return;
		const percentX = this.bass.mouseTracker.mousePos.x / this.bass.viewWidth;
		const hoveredStringNumber = Math.ceil(percentX * 4) as BassString;
		return this.app.performance.program.state.bass.stringStores[
			hoveredStringNumber
		];
	}

	@action.bound handleWheel(e: React.WheelEvent<SVGSVGElement>) {
		if (!this.hoveredString) return;
		this.hoveredString.moveCapo(
			this.hoveredString.capo + (e.deltaY > 0 ? 1 : -1)
		);
	}

	componentDidMount() {
		if (!this.fretBoardRef.current) return;
		this.bass.mouseTracker.setElement(this.fretBoardRef.current);
	}

	render() {
		return (
			<Provider bass={this.bass}>
				<svg
					viewBox={`0 0 ${this.bass.viewWidth} ${this.bass.viewHeight}`}
					style={{
						width: this.bass.viewWidth,
						height: this.bass.viewHeight,
					}}
					ref={this.fretBoardRef}
					onMouseMove={this.bass.mouseTracker.update}
					onMouseLeave={this.bass.mouseTracker.leave}
					onWheel={this.handleWheel}
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
						this.app.performance.program.state.bass.stringStores
					).map((stringStore) => (
						<String stringStore={stringStore} key={stringStore.string} />
					))}
					<FretFinger />
				</svg>
			</Provider>
		);
	}
}

export const Bass = AppComponent.sync(Bass_);
