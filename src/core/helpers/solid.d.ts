export declare type Signal<T> = (newVal?: T) => T;
export declare type Getter<T> = () => T;
export declare function signal<T>(val: T): Signal<T>;
export declare function memo<T>(func: Getter<T>): Getter<T>;
export declare function once<T>(func: () => T): () => T;
