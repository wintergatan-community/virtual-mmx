import { Signal } from "./solid";

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
