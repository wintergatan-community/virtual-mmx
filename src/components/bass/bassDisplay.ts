import { mapValue } from "../../core/helpers/functions";
import { signal } from "../../core/helpers/solid";

export class BassDisplayStore {
	movingCapo = signal(false);

	viewWidth = 73;
	viewHeight = 511;

	totalFrets = 22;

	fretHeight = () => this.viewHeight / this.totalFrets;

	private pad = 10;
	stringToPixel(string: number) {
		return mapValue(string, 1, 4, this.pad, this.viewWidth - this.pad);
	}
	pixelToString(pixel: number) {
		return mapValue(pixel, this.pad, this.viewWidth - this.pad, 1, 4);
	}
	fretToPixel(fret: number) {
		return (fret * this.viewHeight) / this.totalFrets;
	}
	pixelToFret(pixel: number) {
		return (pixel * this.totalFrets) / this.viewHeight;
	}
}
