import { Note } from "vmmx-schema";
export declare function range(start: number, stop: number, step?: number): number[];
export declare function mapValue(n: number, start1: number, stop1: number, start2: number, stop2: number): number;
export declare function insertInOrder<T>(item: T, insertAfter: (other: T) => boolean, arr: T[]): void;
export declare function removeInOrder<T>(testFunc: (item: T, index: number) => boolean, arr: T[]): T | undefined;
export declare function arrToPolyLine(points: number[][]): string;
export declare function noteToVibraphoneLength(note: Note): number;
export declare type ObjectKey = string | number | symbol;
export declare function fromEntries<Key extends ObjectKey, Value>(entries: [Key, Value][]): Record<Key, Value>;
export declare function mapToObject<Key extends ObjectKey, InValue, OutValue>(objectToMap: Record<Key, InValue>, func: (key: Key, value: InValue) => OutValue): Record<Key, OutValue>;
export declare function mapArrayToObj<Key extends ObjectKey, Value>(keys: Key[], func: (key: Key) => Value): Record<Key, Value>;
export interface Point {
    x: number;
    y: number;
}
interface Indexable {
    [index: string]: any;
}
export declare function forEachInNested(obj: Indexable, shouldCallFuncOn: (obj: Indexable) => boolean, func: (obj: Indexable) => void): void;
export declare function keys<Key extends ObjectKey, Value>(obj: Record<Key, Value>): Key[];
export declare function values<Key extends ObjectKey, Value>(obj: Record<Key, Value>): Value[];
export declare function entries<Key extends ObjectKey, Value>(obj: Record<Key, Value>): [Key, Value][];
export declare function findEnhanced<T>(array: T[], foundFunc: (element: T) => boolean, startIndex?: number, direction?: "forward" | "backward"): [T | null, number | null];
export declare function findIndexEnhanced<T>(array: T[], foundFunc: (element: T) => boolean, startIndex?: number, direction?: "forward" | "backward"): number | null;
export {};
