import React, { Component } from "react";
import { observer } from "mobx-react";
import { computed, action } from "mobx";
import { BassString } from "vmmx-schema";
import { mapValue } from "../../core/helpers";
import { Capo } from "./Capo";
import { bass } from "./Bass";
import { bassStrings } from "../../core/playback/instruments/instruments";

interface StringProps {
	string: BassString;
}

@observer
export class String extends Component<StringProps> {
	@computed get x() {
		const pad = 10;
		return mapValue(this.props.string, 1, 4, pad, bass.viewWidth - pad);
	}

	@computed get width() {
		return bass.viewWidth / bassStrings.length;
	}

	@action.bound handleScroll(e: React.WheelEvent<SVGRectElement>) {
		// bass.strings[this.props.string].capoPos += e.deltaY / 20;
	}

	render() {
		return (
			<g style={{ transform: `translateX(${this.x}px)` }}>
				<line
					y1={0}
					y2={bass.viewHeight}
					x1={0}
					x2={0}
					stroke="rgb(195, 195, 195)"
				/>
				<rect
					x={-this.width / 2}
					y={0}
					width={this.width}
					height={bass.viewHeight}
					fill="#0003"
					onWheel={this.handleScroll}
				/>
				<Capo string={this.props.string} />
			</g>
		);
	}
}
