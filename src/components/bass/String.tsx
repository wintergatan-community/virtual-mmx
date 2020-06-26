import React from "react";
import { computed, action } from "mobx";
import { mapValue } from "../../core/helpers";
import { Capo } from "./Capo";
import { bassStrings } from "../../core/playback/types";
import { BassComponent } from "../storeComponents";
import { BassStringStore } from "../../stores/bass";

interface StringProps {
	stringStore: BassStringStore;
}

export class String_ extends BassComponent<StringProps> {
	@computed get x() {
		const pad = 10;
		const viewWidth = this.bass.viewWidth;
		const bassString = this.props.stringStore.string;
		return mapValue(bassString, 1, 4, pad, viewWidth - pad);
	}

	@computed get width() {
		return this.bass.viewWidth / bassStrings.length;
	}

	@action.bound handleScroll(/*e: React.WheelEvent<SVGRectElement>*/) {
		// bass.strings[this.props.string].capoPos += e.deltaY / 20;
	}

	render() {
		return (
			<g style={{ transform: `translateX(${this.x}px)` }}>
				<line
					y1={0}
					y2={this.bass.viewHeight}
					x1={0}
					x2={0}
					stroke="rgb(195, 195, 195)"
				/>
				{/* <rect
					x={-this.width / 2}
					y={0}
					width={this.width}
					height={bass.viewHeight}
					fill="#0003"
					onWheel={this.handleScroll}
				/> */}
				<Capo stringStore={this.props.stringStore} />
			</g>
		);
	}
}

export const String = BassComponent.sync(String_);
