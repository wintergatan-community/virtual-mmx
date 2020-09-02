import { mapValue } from "../../core/helpers/functions";
import { RunningTimeline } from "./RunningTimeline";
import { For, useContext } from "solid-js";
import { ScrollBody } from "../Scroll";
import { PerformanceEditorContext } from "./PerformanceEditor";

interface ValueTimelineProps {
	labels: number[];
	children: (valueToPixel: (value: number) => number) => JSX.Element;
}

export const ValueTimeline = (props: ValueTimelineProps) => {
	const { scroll } = useContext(PerformanceEditorContext);

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
			<ScrollBody scroll={scroll}>{props.children(valueToPixel)}</ScrollBody>
		</g>
	);
};
