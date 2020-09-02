import { signal, memo, Signal } from "../core/helpers/solid";
import { findIndexEnhanced } from "../core/helpers/functions";

interface ScrollAxisStoreProps {
	visibleLeast?: Signal<number>;
	pixelsPerUnit?: Signal<number>;
	visiblePixelRange?: Signal<number>;
	total?: Signal<number>;
	circular?: boolean;
}

export class ScrollAxisStore {
	// total = signal(-1);
	visibleLeast: Signal<number>;
	pixelsPerUnit: Signal<number>;
	visiblePixelRange: Signal<number>;
	total: Signal<number>;
	circular: boolean;

	constructor(c?: ScrollAxisStoreProps) {
		// TODO these constants won't be here
		this.visibleLeast = c?.visibleLeast ?? signal(0);
		this.pixelsPerUnit = c?.pixelsPerUnit ?? signal(24);
		this.visiblePixelRange = c?.visiblePixelRange ?? signal(500);
		this.total = c?.total ?? signal(1500);
		this.circular = c?.circular ?? false;
	}

	visibleRange = () => this.visiblePixelRange() / this.pixelsPerUnit();
	visibleMost = () => this.visibleLeast() + this.visibleRange();

	toPixel = (val: number) => val * this.pixelsPerUnit();
	fromPixel = (val: number) => val / this.pixelsPerUnit();

	// actions

	zoom = (factor: number, fixedPoint: number) => {
		const oldPixelsPerUnit = this.pixelsPerUnit();
		let newPixelsPerUnit = oldPixelsPerUnit * factor;

		const minPixelsPerUnit = this.visiblePixelRange() / this.total();
		const maxPixelsPerUnit = 0.3;
		if (newPixelsPerUnit < minPixelsPerUnit) {
			newPixelsPerUnit = minPixelsPerUnit;
		} else if (newPixelsPerUnit > maxPixelsPerUnit) {
			newPixelsPerUnit = maxPixelsPerUnit;
		}

		const m = fixedPoint;
		const t = this.visibleLeast();
		const r = oldPixelsPerUnit / newPixelsPerUnit;
		let newLeast = m - r * (m - t); // mmm... algebra's hard
		if (newLeast < 0) newLeast += this.total(); // too far above
		if (newLeast >= this.total()) newLeast -= this.total(); // too far below

		this.pixelsPerUnit(newPixelsPerUnit);
		this.visibleLeast(newLeast);
	};
	scroll = (dy: number) => {
		let newLeast = this.visibleLeast() + this.fromPixel(dy);
		if (this.circular) {
			if (newLeast >= this.total()) newLeast -= this.total();
			if (newLeast < 0) newLeast += this.total();
		} else {
			if (newLeast >= this.total()) newLeast = this.total();
			if (newLeast < 0) newLeast = 0;
		}
		this.visibleLeast(newLeast);
	};

	visibleArrayOf<T>(
		data: Signal<T[]>,
		getElementPos: (element: T) => number,
		type?: "circular"
	) {
		// this is over complication at its finest, but oh boy it works well
		const v = getElementPos;

		const least =
			type === "circular"
				? () => this.visibleLeast() - this.total()
				: this.visibleLeast;

		const most = () => least() + this.visibleRange();

		const dataInit = data();
		let startIndex = findIndexEnhanced(dataInit, (d) => v(d) >= least()) ?? 0;

		let endIndex = Math.max(
			0,
			(findIndexEnhanced(dataInit, (d) => v(d) > most()) ?? dataInit.length) - 1
		);

		const backSearch = (data: T[], bound: number, index: number) => {
			return (
				(findIndexEnhanced(data, (e) => v(e) < bound, index, "backward") ??
					-1) + 1
			);
		};
		const frontSearch = (data: T[], bound: number, index: number) => {
			return (
				(findIndexEnhanced(data, (e) => v(e) > bound, index, "forward") ??
					data.length) - 1
			);
		};

		return memo(() => {
			const d = data();

			const start = least();
			const end = most();

			// this part can still be improved I think

			if (startIndex >= d.length) {
				startIndex = frontSearch(d, start, 0);
			} else if (start > v(d[startIndex])) {
				// remove some off front
				startIndex = frontSearch(d, start, startIndex);
			} else if (start < v(d[startIndex])) {
				// add some to front
				startIndex = backSearch(d, start, startIndex);
			}

			if (endIndex >= d.length) {
				endIndex = backSearch(d, end, d.length - 1);
			} else if (end > v(d[endIndex])) {
				// add some to end
				endIndex = frontSearch(d, end, endIndex);
			} else if (end < v(d[endIndex])) {
				// remove some from end
				endIndex = backSearch(d, end, endIndex);
			}

			return d.slice(startIndex, endIndex + 1);
		});
	}
}

interface ScrollContainerStoreProps {
	x?: ScrollAxisStoreProps;
	y?: ScrollAxisStoreProps;
	circular?: boolean;
}

export class ScrollContainerStore {
	x: ScrollAxisStore;
	y: ScrollAxisStore;

	constructor(c?: ScrollContainerStoreProps) {
		this.x = new ScrollAxisStore(c?.x);
		this.y = new ScrollAxisStore(c?.y);
	}

	// gridSnappedMouseScaled = () => {
	// 	const m = this.mouseScaled();
	// 	if (!m) return undefined;

	// 	const div = this.ticksPerNoteSubdivision();
	// 	const modded = m.mouseX % this.totalY();
	// 	const mouseX = Math.floor(modded / div) * div;
	// 	const mouseY = Math.floor(m.mouseY);
	// 	return { mouseX, mouseY };
	// };

	inVisibleRange = (x: number) => true; // x >= this.visibleLeastX() && x <= this.visibleMostX();
}
