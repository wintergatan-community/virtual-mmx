import { mapValue } from "../../core/helpers/functions";
import { RunningTimeline } from "./RunningTimeline";
import { For } from "solid-js";

interface ValueTimelineProps {
	labels: number[];
	children: (valueToPixel: (value: number) => number) => JSX.Element;
}

export const ValueTimeline = (props: ValueTimelineProps) => {
	const valueToPixel = (value: number) => {
		const labels = props.labels;
		const last = labels[labels.length - 1];
		const pad = 20;
		return mapValue(value, labels[0], last, 150 - pad, pad); // TODO not fixed value
	};

	return (
		<g>
			<For each={props.labels}>
				{(label) => <RunningTimeline label={label} y={valueToPixel(label)} />}
			</For>
			{props.children(valueToPixel)}
		</g>
	);
};
