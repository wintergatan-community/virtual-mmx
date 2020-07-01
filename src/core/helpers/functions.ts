import { Note } from "vmmx-schema";

export function range(start: number, stop: number, step?: number) {
	if (step === undefined) step = 1;

	const result: number[] = [];
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

export function insertInOrder<T>(item: T, arr: T[]) {
	let i;
	for (i = 0; i < arr.length && arr[i] < item; i++);
	arr.splice(i, 0, item);
}
export function removeInOrder<T>(testFunc: (item: T) => boolean, arr: T[]) {
	let i;
	for (i = 0; i < arr.length && !testFunc(arr[i]); i++);
	arr.splice(i, 1);
}

export function arrToPolyLine(points: number[][]) {
	let res = "";
	for (const point of points) {
		res += point[0] + "," + point[1] + " ";
	}
	return res;
}

export function noteToVibraphoneLength(note: Note) {
	const index = notesArray.indexOf(note);
	return (90 - index) * 4 + 60; // TODO this is absolute garbage
}

// TODO this should be in schema as an array somewhere
const notesArray = [
	"C-1",
	"C#-1",
	"D-1",
	"D#-1",
	"E-1",
	"F-1",
	"F#-1",
	"G-1",
	"G#-1",
	"A-1",
	"A#-1",
	"B-1",
	"C0",
	"C#0",
	"D0",
	"D#0",
	"E0",
	"F0",
	"F#0",
	"G0",
	"G#0",
	"A0",
	"A#0",
	"B0",
	"C1",
	"C#1",
	"D1",
	"D#1",
	"E1",
	"F1",
	"F#1",
	"G1",
	"G#1",
	"A1",
	"A#1",
	"B1",
	"C2",
	"C#2",
	"D2",
	"D#2",
	"E2",
	"F2",
	"F#2",
	"G2",
	"G#2",
	"A2",
	"A#2",
	"B2",
	"C3",
	"C#3",
	"D3",
	"D#3",
	"E3",
	"F3",
	"F#3",
	"G3",
	"G#3",
	"A3",
	"A#3",
	"B3",
	"C4",
	"C#4",
	"D4",
	"D#4",
	"E4",
	"F4",
	"F#4",
	"G4",
	"G#4",
	"A4",
	"A#4",
	"B4",
	"C5",
	"C#5",
	"D5",
	"D#5",
	"E5",
	"F5",
	"F#5",
	"G5",
	"G#5",
	"A5",
	"A#5",
	"B5",
	"C6",
	"C#6",
	"D6",
	"D#6",
	"E6",
	"F6",
	"F#6",
	"G6",
	"G#6",
	"A6",
	"A#6",
	"B6",
	"C7",
	"C#7",
	"D7",
	"D#7",
	"E7",
	"F7",
	"F#7",
	"G7",
	"G#7",
	"A7",
	"A#7",
	"B7",
	"C8",
	"C#8",
	"D8",
	"D#8",
	"E8",
	"F8",
	"F#8",
	"G8",
	"G#8",
	"A8",
	"A#8",
	"B8",
	"C9",
	"C#9",
	"D9",
	"D#9",
	"E9",
	"F9",
	"F#9",
	"G9",
];

type ObjectKey = string | number | symbol;

// Object.fromEntries doesn't play well with typescript normally
export function fromEntries<Key extends ObjectKey, Value>(
	entries: [Key, Value][]
) {
	return Object.fromEntries(entries) as Record<Key, Value>;
}

export function mapToObject<Key extends ObjectKey, InValue, OutValue>(
	objectToMap: Record<Key, InValue>,
	func: (key: Key, value: InValue) => OutValue
) {
	return fromEntries(
		Object.entries(objectToMap).map(([key, value]) => [
			key as Key,
			func(key as Key, value as InValue),
		])
	);
}

export interface Point {
	x: number;
	y: number;
}

// type Keyable = string | number;

// function nestedFromFlat<K extends Keyable, O>(
// 	keyArray: K[],
// 	keyString: Keyable,
// 	dataObj: Record<Keyable, O[keyof O]>
// ): Record<K, O> {
// 	return fromEntries(
// 		keyArray.map((key) => [
// 			key,
// 			fromEntries(
// 				Object.entries(dataObj).map(([prop, values]) => [
// 					prop,
// 					values[key],
// 				])
// 			),
// 		])
// 	);

// 	OR

// 	let result = {}
// 	for(let key of keyArray) {
// 		result[key] = {}
// 		for(let [prop, values] of Object.entries(dataObj)) {
// 			result[key][prop] = values[key]
// 		}
// 	}
// 	return result
// }
