import { Note } from "vmmx-schema";
export declare function range(start: number, stop: number, step?: number): number[];
export declare function mapValue(n: number, start1: number, stop1: number, start2: number, stop2: number): number;
export declare function insertInOrder<T>(item: T, arr: T[]): void;
export declare function removeInOrder<T>(testFunc: (item: T) => boolean, arr: T[]): void;
export declare function arrToPolyLine(points: number[][]): string;
export declare function noteToVibraphoneLength(note: Note): number;
declare type ObjectKey = string | number | symbol;
export declare function fromEntries<Key extends ObjectKey, Value>(entries: [Key, Value][]): Record<Key, Value>;
export declare function mapToObject<Key extends ObjectKey, InValue, OutValue>(objectToMap: Record<Key, InValue>, func: (key: Key, value: InValue) => OutValue): Record<Key, OutValue>;
export interface Point {
    x: number;
    y: number;
}
export {};
