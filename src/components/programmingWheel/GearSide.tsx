import React from "react";
import { range, arrToPolyLine } from "../../core/helpers";
import { TranslateGrid } from "./TranslateGrid";
import { computed } from "mobx";
import { WheelComponent } from "../storeComponents";

interface GearSideProps {
	x: number;
}

// TODO needs major optimization and better structure
class GearSide_ extends WheelComponent<GearSideProps> {
	@computed get repeat() {
		return this.wheel.tpq * 2;
	}
	@computed get segments() {
		return range(0, this.wheel.totalTicks, this.repeat);
	}
	@computed get scale() {
		return this.wheel.tickToPixel(this.repeat);
	}
	w(n: number) {
		return n * this.wheel.gearWidth;
	}
	h(n: number) {
		return n * this.scale;
	}
	scaledPoints(arr: number[][]) {
		return arr.map((a) => [this.w(a[0]), this.h(a[1])]);
	}
	@computed get points1() {
		return arrToPolyLine(
			this.scaledPoints([
				[0, 0],
				[0.1, 0.3],
				[0.9, 0.3],
				[1, 0],
			])
		);
	}
	@computed get points2() {
		return arrToPolyLine(
			this.scaledPoints([
				[0.1, 0.7],
				[0, 1],
				[1, 1],
				[0.9, 0.7],
			])
		);
	}
	@computed get points3() {
		return arrToPolyLine(
			this.scaledPoints([
				[0, 0],
				[0, 1],
				[0.1, 0.7],
				[0.1, 0.3],
			])
		);
	}
	@computed get points4() {
		return arrToPolyLine(
			this.scaledPoints([
				[1, 0],
				[1, 1],
				[0.9, 0.7],
				[0.9, 0.3],
			])
		);
	}
	@computed get rectBits() {
		return this.scaledPoints([
			[0.1, 0.3],
			[0.8, 0.5],
		]);
	}

	render() {
		return (
			<g style={{ transform: `translateX(${this.props.x}px)` }}>
				{this.segments.map((tick, i) => (
					<TranslateGrid tick={tick} key={i}>
						<polyline
							fill="#d7ba89"
							stroke="#d7ba89"
							points={this.points1}
						/>
						<rect
							x={this.rectBits[0][0]}
							y={this.rectBits[0][1]}
							width={this.rectBits[1][0]}
							height={this.rectBits[1][1]}
							fill="#c9af83"
							stroke="#c9af83"
						/>
						<polyline
							fill="#bfa982"
							stroke="#bfa982"
							points={this.points2}
						/>
						<polyline
							fill="#b09c78"
							stroke="#b09c78"
							points={this.points3}
						/>
						<polyline
							fill="hsl(38, 49%, 69%)"
							stroke="hsl(38, 49%, 69%)"
							points={this.points4}
						/>
					</TranslateGrid>
				))}
			</g>
		);
	}
}

export const GearSide = WheelComponent.sync(GearSide_);
