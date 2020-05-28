import { VibraphoneChannel, VibraphoneState } from "vmmx-schema";

export function range(start: number, stop: number, step?: number) {
	if (step === undefined) step = 1;

	let result: number[] = [];
	if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		return result;
	}

	for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
		result.push(i);
	}

	return result;
}

export function mapValue(
	n: number,
	start1: number,
	stop1: number,
	start2: number,
	stop2: number
) {
	return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

export function arrToPolyLine(points: number[][]) {
	let res = "";
	for (let point of points) {
		res += point[0] + "," + point[1] + " ";
	}
	return res;
}

export function vibraphoneChannelToNote(
	channel: VibraphoneChannel,
	vibraphoneState: VibraphoneState
): string {
	const note = vibraphoneState.notes[channel];
	return note;
}
