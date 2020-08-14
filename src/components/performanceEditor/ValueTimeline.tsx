import React, { Component } from "react";
import { mapValue } from "../../core/helpers/functions";
import { observer } from "mobx-react";
import { RunningTimeline } from "./RunningTimeline";

interface ValueTimelineProps {
	labels: number[];
	children: (valueToPixel: (value: number) => number) => JSX.Element;
}

@observer
export class ValueTimeline extends Component<ValueTimelineProps> {
	valueToPixel = (value: number) => {
		const labels = this.props.labels;
		const last = labels[labels.length - 1];
		const pad = 20;
		return mapValue(value, labels[0], last, 150 - pad, pad); // TODO not fixed value
	};

	render() {
		return (
			<g>
				{this.props.labels.map((label) => (
					<RunningTimeline
						label={label}
						y={this.valueToPixel(label)}
						key={label}
					/>
				))}
				{this.props.children(this.valueToPixel)}
			</g>
		);
	}
}
