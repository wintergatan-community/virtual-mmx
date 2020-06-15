import React, { Component } from "react";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { BassString } from "vmmx-schema";
import { mapValue } from "../../core/helpers";
import { Capo } from "./Capo";
import { bass } from "./Bass";

interface StringProps {
	string: BassString;
}

@observer
export class String extends Component<StringProps> {
	@computed get x() {
		const pad = 10;
		return mapValue(this.props.string, 1, 4, pad, bass.viewWidth - pad);
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
				<Capo string={this.props.string} />
			</g>
		);
	}
}
