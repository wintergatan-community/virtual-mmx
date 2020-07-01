import { MouseTracker } from "./MouseTracker";
import { mapValue } from "../../core/helpers/functions";
import { computed } from "mobx";

export class BassDisplayStore {
	movingFret = false;
	mouseTracker = new MouseTracker();

	viewWidth = 73;
	viewHeight = 511;

	totalFrets = 22;

	@computed get fretHeight() {
		return this.viewHeight / this.totalFrets;
	}

	private pad = 10;

	stringToPixel = (string: number) => {
		return mapValue(string, 1, 4, this.pad, this.viewWidth - this.pad);
	};
	pixelToString = (pixel: number) => {
		return mapValue(pixel, this.pad, this.viewWidth - this.pad, 1, 4);
	};
	fretToPixel = (fret: number) => {
		return mapValue(fret, 0, this.totalFrets, 0, this.viewHeight);
	};
	pixelToFret = (pixel: number) => {
		return mapValue(pixel, 0, this.viewHeight, 0, this.totalFrets);
	};
}
