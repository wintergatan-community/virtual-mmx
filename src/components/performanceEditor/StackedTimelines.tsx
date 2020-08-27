import { mapValue } from "../../core/helpers/functions";
import { RunningTimeline } from "./RunningTimeline";
import { For } from "solid-js";

interface StackedTimelineProps<T> {
	labels: T[];
	children: (label: T) => JSX.Element;
}

export function StackedTimeline<T extends string | number>(
	props: StackedTimelineProps<T>
) {
	const scaledLabels = () => {
		const labels = props.labels;
		const pad = 20;
		return labels.map((label, i) => ({
			label,
			fit: mapValue(i, 0, labels.length - 1, pad, 150 - pad), // TODO not fixed value
		}));
	};

	return (
		<g>
			<For each={scaledLabels()}>
				{({ label, fit }) => (
					<RunningTimeline label={label} y={fit}>
						{props.children(label)}
					</RunningTimeline>
				)}
			</For>
		</g>
	);
}
