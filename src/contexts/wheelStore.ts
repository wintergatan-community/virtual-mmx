import { NoteSubdivision } from "../core/types";
import { Note } from "vmmx-schema/note_names";
import { GlobalStore } from "./globalStore";
import { observable, computed, action } from "mobx";
import { range } from "../core/helpers";

interface WheelMousePos {
	mouseTick: number;
	mouseChannel: number;
}

interface WheelChannelInfo {
	descriptor: string;
	instrument: string;
	tuning: Note;
}

type PegOffsetFunction = (tick: number) => number;
type PegOffsetFunctionKey = "realistic"; // TODO more

type SubdivisionLineFunction = (
	tick: number
) => { stroke: string; strokeWidth: number };
type SubdivisionLineFunctionKey = "primary"; // TODO more

interface ProgrammingWheelInterface {
	/** The total number of ticks in the wheel */
	totalTicks: number;
	/** The total number of channels in the wheel */
	totalChannels: number;
	/** The visble width of the wheel in pixels */
	visiblePixelWidth: number;
	/** The visble height of the wheel in pixels */
	visiblePixelHeight: number;

	/** The topmost tick of the visible wheel */
	visibleTopTick: number;
	/** The bottommost tick of the visible wheel */
	visibleBottomTick: number;
	/** The leftmost channel of the visible wheel */
	visibleLeftChannel: number;
	/** The rightmost channel of the visible wheel */
	visibleRightChannel: number;

	/** The position of the mouse on the wheel in ticks and channels */
	mousePos: WheelMousePos | undefined;
	/** The position of the mouse on the wheel snapped to the nearest tick and channel*/
	gridSnappedMousePos: WheelMousePos | undefined;
	/** The number of pixels between quarter notes */
	pixelsPerQuarter: number;
	/** The width of a channel in pixels */
	channelWidth: number;
	/** Whether or not translucent pegs should be rendered for the current subdivision in the absence of a drop event */
	showEmpties: boolean;
	/** An array of WheelChannelInfo used for channel column headers and instrument identification*/
	wheelChannelInfos: WheelChannelInfo[];
	/** An array of numbers representing SubdivsionLine ticks */
	subdivisionLines: number[];

	/** Returns a value from 0 to 1 representing where a peg should be rendered horizontally on its channel based on its subdivision  */
	pegOffsetFunction: PegOffsetFunction;
	/** An object containing keyed PegOffsetFunctions */
	pegOffsetFunctions: { [key in PegOffsetFunctionKey]: PegOffsetFunction };
	/** Returns an object containing stroke and strokeWidth properties based on a SubdivisionLine's subdivision  */
	subdivisionLineFunction: SubdivisionLineFunction;
	/** An object containing keyed SubdivisionLineFunctions */
	subdivisionLineFunctions: {
		[key in SubdivisionLineFunctionKey]: SubdivisionLineFunction;
	};

	/** The number of ticks in one unit of the current note subdivision (quarter, triplet, etc.) */
	ticksPerNoteSubdivision: number;
	/** An object containing keyed ticks per one unit of the current note subdivisions */
	ticksPerNoteSubdivisions: { [type in NoteSubdivision]: number };

	tickToPixel(tick: number): number;
	pixelToTick(x: number): number;
	channelToPixel(channel: number): number;
	pixelToChannel(channel: number): number;

	/** Returns whether or not a tick channel pair is within the visible viewing range */
	inVisibleRange(tick: number, channel: number): boolean;
}

export class ProgrammingWheelStore implements ProgrammingWheelInterface {
	g: GlobalStore;

	@observable totalTicks = this.g.tpq * 40;
	@computed get totalChannels() {
		return this.wheelChannelInfos.length;
	}
	@computed get visiblePixelWidth() {
		return this.totalChannels * this.channelWidth;
	}
	@observable visiblePixelHeight = 400;

	@observable visibleTopTick = 0;
	@computed get visibleBottomTick() {
		return this.visibleTopTick + this.pixelToTick(this.visiblePixelHeight);
	}
	@observable visibleLeftChannel = 0;
	@computed get visibleRightChannel() {
		// TODO this
		return -1;
	}

	@observable mousePos: WheelMousePos | undefined;
	@computed get gridSnappedMousePos() {
		if (!this.mousePos) return undefined;

		const div = this.ticksPerNoteSubdivision;
		const modded = this.mousePos.mouseTick % this.totalTicks;
		const mouseTick = Math.floor(modded / div) * div;
		const mouseChannel = Math.floor(this.mousePos.mouseChannel);
		return { mouseTick, mouseChannel };
	}
	@observable pixelsPerQuarter = 20;
	@observable channelWidth = 55;
	@observable showEmpties = false;
	@computed get wheelChannelInfos() {
		// TODO
		const res: WheelChannelInfo[] = [];
		const vibra = Object.values(this.g.program.state.vibraphone.notes);
		for (let tuning of vibra) {
			res.push({
				descriptor: tuning,
				instrument: "vibraphone",
				tuning,
			});
		}
		const bass = Object.entries(this.g.program.state.bass.tuning);
		for (let [string, tuning] of bass) {
			res.push({
				descriptor: "String " + string,
				instrument: "bass",
				tuning: tuning ?? "A_1", // TODO handle undefined case
			});
		}
		// TODO drums
		return res;
	}

	@computed get pegOffsetFunction() {
		return this.pegOffsetFunctions.realistic;
	}
	@observable pegOffsetFunctions = {
		realistic: function (this: ProgrammingWheelStore, tick: number) {
			if (tick % this.ticksPerNoteSubdivisions.eighth === 0) {
				return 0.5;
			} else if (tick % this.ticksPerNoteSubdivisions.sixteenth === 0) {
				return 0.1;
			} else if (tick % this.ticksPerNoteSubdivisions.triplet === 0) {
				return 0.9;
			}
			return 0;
		},
	};
	@computed get subdivisionLineFunction() {
		return this.subdivisionLineFunctions.primary;
	}
	@observable subdivisionLineFunctions = {
		primary: function (this: ProgrammingWheelStore, tick: number) {
			if (tick % this.ticksPerNoteSubdivisions.whole === 0) {
				return { stroke: "rgb(115, 115, 115)", strokeWidth: 1 };
			} else if (tick % this.ticksPerNoteSubdivisions.quarter === 0) {
				return { stroke: "rgb(63, 63, 63)", strokeWidth: 1 };
			} else if (tick % this.ticksPerNoteSubdivisions.eighth === 0) {
				return { stroke: "rgb(43, 43, 43)", strokeWidth: 1 };
			}
			return { stroke: "rgb(33, 33, 33)", strokeWidth: 1 };
		},
	};

	@observable ticksPerNoteSubdivision = 240; // TODO figure out why can't link to quarter without get crash
	@computed get ticksPerNoteSubdivisions() {
		return {
			whole: this.g.tpq * 4,
			quarter: this.g.tpq * 1,
			eighth: this.g.tpq / 2,
			sixteenth: this.g.tpq / 4,
			triplet: (this.g.tpq * 2) / 3,
		};
	}

	@computed get tickToPixel() {
		return (tick: number) => (tick * this.pixelsPerQuarter) / this.g.tpq;
	}
	@computed get pixelToTick() {
		return (x: number) => (x / this.pixelsPerQuarter) * this.g.tpq;
	}
	@computed get channelToPixel() {
		return (channel: number) => channel * this.channelWidth;
	}
	@computed get pixelToChannel() {
		return (y: number) => y / this.channelWidth;
	}

	@computed get inVisibleRange() {
		// TODO deal with cases where some items on top of screen don't render
		return (tick: number) =>
			tick >= this.visibleTopTick && tick <= this.visibleBottomTick;
	}
	@computed get subdivisionLines() {
		return range(0, this.totalTicks, this.ticksPerNoteSubdivision);
	}

	// actions

	@action zoom(change: number) {
		if (!this.mousePos) return;

		let oldPerQuarter = this.pixelsPerQuarter;
		let newPerQuarter = oldPerQuarter - change;

		const minPerQuarter =
			this.visiblePixelHeight / (this.totalTicks / this.g.tpq);
		if (newPerQuarter < minPerQuarter) return; // already fully zoomed out

		let m = this.mousePos.mouseTick;
		let t = this.visibleTopTick;
		let r = oldPerQuarter / newPerQuarter;
		let x = m - t - r * (m - t);
		let newTop = x + this.visibleTopTick;
		if (newTop < 0) newTop += this.totalTicks; // too far above

		this.pixelsPerQuarter = newPerQuarter;
		this.visibleTopTick = newTop;
	}
	@action scroll(dy: number) {
		let newTick = this.visibleTopTick + this.pixelToTick(dy);
		if (newTick >= this.totalTicks) newTick -= this.totalTicks;
		if (newTick < 0) newTick += this.totalTicks;
		this.visibleTopTick = newTick;
	}
	@action setSubdivision(type: NoteSubdivision) {
		this.ticksPerNoteSubdivision = this.ticksPerNoteSubdivisions[type]; // TODO use action
	}
	@action moveMouse(mouseTick: number, mouseChannel: number) {
		this.mousePos = { mouseTick, mouseChannel };
	}

	constructor(g: GlobalStore) {
		this.g = g;
	}
}
