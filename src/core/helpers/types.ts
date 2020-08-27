import { Signal } from "./solid";
import { mapArrayToObj } from "./functions";

export type SignalWrapped<T> = {
	[K in keyof T]: T[K] extends Record<string, unknown>
		? SignalWrapped<T[K]>
		: Signal<T[K]>;
};

// export type SomeSignalWrapped<T> = {
// 	[K in keyof T]: T[K] extends Record<string, unknown>
// 		? SignalWrapped<T[K]>
// 		: Signal<T[K]> | T[K];
// };

export type SomeSignalWrapped<T> = {
	[K in keyof T]: T[K] extends string | number | boolean | undefined
		? Signal<T[K]> | T[K]
		: SignalWrapped<T[K]>;
};

const observableMethods = ["splice", "push"] as const;
// class ObservableArray<T> {
// 	arr: T[] = [];
// 	listeners = mapArrayToObj(observableMethods, () => []);

// 	on(key: typeof observableMethods[number], listener: () => void) {
// 		this.listeners.push(listener);
// 	}

// 	splice() {}
// }

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
