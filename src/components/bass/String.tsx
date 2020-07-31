import React from "react";
import { computed, action } from "mobx";
import { Capo } from "./Capo";
import { BassComponent } from "../storeComponents";
import { BassStringStore } from "../../stores/bass";
import { SpringPulse } from "../../core/helpers/springPulse";
import { bassStrings } from "../../toFutureSchema";

interface StringProps {
	stringStore: BassStringStore;
}

export class String_ extends BassComponent<StringProps> {
	vibrate = new SpringPulse();

	@computed get x() {
		return this.bass.stringToPixel(this.props.stringStore.string);
	}

	@computed get width() {
		return this.bass.viewWidth / bassStrings.length - 2;
	}

	@action.bound handleScroll(/*e: React.WheelEvent<SVGRectElement>*/) {
		// bass.strings[this.props.string].capoPos += e.deltaY / 20;
	}

	@action.bound strum(e: React.MouseEvent<SVGLineElement, MouseEvent>) {
		if (e.buttons === 1) {
			this.bassStringTimelines.performance.triggerEvent();
			this.vibrate.applyCollision(1);
		}
	}

	get bassStringTimelines() {
		return this.app.jointTimelines.bass[this.props.stringStore.string];
	}

	render() {
		return (
			<g style={{ transform: `translateX(${this.x}px)` }}>
				<line
					// string
					y1={0}
					y2={this.bass.viewHeight}
					x1={0}
					x2={0}
					stroke={`rgb(${this.vibrate.value * 50}, ${
						this.vibrate.value * 50
					}, ${this.vibrate.value * 50})`}
					strokeWidth={1.5}
				/>
				<line
					// strum hit box
					y1={0}
					y2={this.bass.viewHeight}
					x1={0}
					x2={0}
					stroke="#0000"
					strokeWidth={6}
					onMouseEnter={this.strum}
				/>
				<Capo stringStore={this.props.stringStore} />
			</g>
		);
	}
}

export const String = BassComponent.sync(String_);
