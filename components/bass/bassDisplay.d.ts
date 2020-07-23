import { MouseTracker } from "./MouseTracker";
export declare class BassDisplayStore {
    movingFret: boolean;
    mouseTracker: MouseTracker;
    viewWidth: number;
    viewHeight: number;
    totalFrets: number;
    get fretHeight(): number;
    private pad;
    stringToPixel: (string: number) => number;
    pixelToString: (pixel: number) => number;
    fretToPixel: (fret: number) => number;
    pixelToFret: (pixel: number) => number;
}
