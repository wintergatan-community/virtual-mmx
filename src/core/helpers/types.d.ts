import { Signal } from "./solid";
export declare type SignalWrapped<T> = {
    [K in keyof T]: T[K] extends Record<string, unknown> ? SignalWrapped<T[K]> : Signal<T[K]>;
};
export declare type SomeSignalWrapped<T> = {
    [K in keyof T]: T[K] extends string | number | boolean | undefined ? Signal<T[K]> | T[K] : SignalWrapped<T[K]>;
};
export declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
