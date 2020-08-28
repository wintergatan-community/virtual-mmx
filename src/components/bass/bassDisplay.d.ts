export declare class BassDisplayStore {
    movingCapo: import("../../core/helpers/solid").Signal<boolean>;
    viewWidth: number;
    viewHeight: number;
    totalFrets: number;
    fretHeight: () => number;
    private pad;
    stringToPixel(string: number): number;
    pixelToString(pixel: number): number;
    fretToPixel(fret: number): number;
    pixelToFret(pixel: number): number;
}
