import { For } from "solid-js";
import { Line } from "./Line";
import { Signal, signal, memo } from "../core/helpers/solid";
import { findIndexEnhanced } from "../core/helpers/functions";

interface ScrollContainerProps<T> {
	start: Signal<number>;
	span: Signal<number>;
	data: Signal<T[]>;
	getValue(item: T): number;
	children: (e: number) => JSX.Element;
}

export function ScrollContainer<T>(props: ScrollContainerProps<T>) {
	const v = props.getValue;
	const s = signal(1);
	// setInterval(() => {
	//   setS(s() + 0.1);
	// }, 200);
	const scale = memo(() => (n: number) => {
		return n * s();
	});

	const dataInit = props.data();
	let startIndex =
		findIndexEnhanced(dataInit, (d) => v(d) >= props.start()) ?? 0;

	let endIndex = Math.max(
		0,
		(findIndexEnhanced(dataInit, (d) => v(d) > props.start() + props.span()) ??
			dataInit.length) - 1
	);
	let lastStart = dataInit[startIndex];
	let lastEnd = dataInit[endIndex];

	const visibleData = memo(() => {
		const data = props.data();

		const end = props.start() + props.span();
		const start = props.start();

		const backSearch = (bound: number, index: number) => {
			return (
				(findIndexEnhanced(data, (e) => v(e) < bound, index, "backward") ??
					-1) + 1
			);
		};
		const frontSearch = (bound: number, index: number) => {
			return (
				(findIndexEnhanced(data, (e) => v(e) > bound, index, "forward") ??
					data.length) - 1
			);
		};

		if (start > v(lastStart)) {
			// remove some off front
			startIndex = frontSearch(start, startIndex);
		} else if (start < v(lastStart)) {
			// add some to front
			startIndex = backSearch(start, startIndex);
		}

		if (end > v(lastEnd)) {
			// add some to end
			endIndex = frontSearch(end, endIndex);
		} else if (end < v(lastEnd)) {
			// remove some from end
			endIndex = backSearch(end, endIndex);
		}

		lastStart = data[startIndex];
		lastEnd = data[endIndex];
		return data.slice(startIndex, endIndex + 1);
	});

	return (
		<svg style={{ width: 500, height: 500 }}>
			<rect width={500} height={500} fill="#0003" />
			<Line color="green" at={scale()(props.start())} />
			<Line color="purple" at={scale()(props.start() + props.span())} />

			<For each={visibleData()}>
				{(e) => memo(() => props.children(scale()(v(e))))}
			</For>
		</svg>
	);
}
