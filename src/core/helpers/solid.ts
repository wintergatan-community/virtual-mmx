import { createSignal, createMemo } from "solid-js";

export type Signal<T> = (newVal?: T) => T;
export type Getter<T> = () => T;

export function signal<T>(val: T): Signal<T> {
	const [signal, setSignal] = createSignal(val);

	return (newVal?: T) => {
		if (newVal === undefined) {
			return signal();
		} else {
			setSignal(newVal);
			return {} as T;
		}
	};
}

export function memo<T>(func: Getter<T>): Getter<T> {
	return createMemo(func);
}

export function once<T>(func: () => T) {
	const res = func();
	return () => res;
}
