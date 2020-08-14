import React, { Component } from "react";
import { computed } from "mobx";
import { mapValue } from "../../core/helpers/functions";
import { observer } from "mobx-react";
import { RunningTimeline } from "./RunningTimeline";

interface StackedTimelineProps<T> {
	labels: T[];
	children: (label: T) => JSX.Element;
}

@observer
export class StackedTimeline<T extends string | number> extends Component<
	StackedTimelineProps<T>
> {
	@computed get scaledLabels() {
		const labels = this.props.labels;
		const pad = 20;
		return labels.map((label, i) => ({
			label,
			fit: mapValue(i, 0, labels.length - 1, pad, 150 - pad), // TODO not fixed value
		}));
	}

	render() {
		return (
			<g>
				{this.scaledLabels.map(({ label, fit }) => (
					<RunningTimeline label={label} y={fit} key={label}>
						<div></div>
					</RunningTimeline>
				))}
			</g>
		);
	}
}
