import { NoteSubdivision } from "../../core/helpers/types";
import { observable, computed, action } from "mobx";
import { range } from "../../core/helpers/functions";
import { VmmxInstrumentChannel } from "../../core/playback/types";
import { AppStore } from "../../stores/app";

interface WheelMousePos {
	mouseTick: number;
	mouseChannel: number;
}

type PegOffsetFunction = (tick: number) => number;
type PegOffsetFunctionKey = "realistic"; // TODO more

type SubdivisionLineFunction = (
	tick: number
) => { stroke: string; strokeWidth: number };
type SubdivisionLineFunctionKey = "primary"; // TODO more

/** The background color to use for displaying a channel */
export enum ChannelColor {
	LIGHT = "rgb(60, 60, 60)",
	DARK = "rgb(39, 39, 39)",
}

/** A single VmmxInstrumentChannel with additional display related information. */
export class DisplayChannel {
	/** The vmmx instrument channel to display */
	vmmxInstrumentChannel: VmmxInstrumentChannel;
	/** The color of this channel */
	channelColor: ChannelColor;

	constructor(
		vmmxInstrumentChannel: VmmxInstrumentChannel,
		channelColor: ChannelColor
	) {
		this.vmmxInstrumentChannel = vmmxInstrumentChannel;
		this.channelColor = channelColor;
	}
}

interface ProgrammingWheelDisplayInterface {
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
	/** An array of DisplayChannel used for channel column headers and instrument identification */
	instrumentChannels: DisplayChannel[];
	/** An array of numbers representing SubdivsionLine ticks */
	subdivisionLines: number[];
	/** The current tick of the playback head */
	playbackHeadTick: number;
	/** The gear width on both sides of the wheel */
	gearWidth: number;

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

export class ProgrammingWheelDisplayStore
	implements ProgrammingWheelDisplayInterface {
	appStore: AppStore;

	@computed get tpq() {
		return this.appStore.program.metadata.tpq;
	}

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}

	@computed get totalTicks() {
		// return this.g.program.metadata.length;
		return 64 * 240;
	}
	@computed get totalChannels() {
		return this.instrumentChannels.length;
	}
	@computed get visiblePixelWidth() {
		return this.totalChannels * this.channelWidth;
	}
	@observable visiblePixelHeight = 455;

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
	@observable pixelsPerQuarter = 35;
	@observable channelWidth = 30; //36
	@observable showEmpties = false;
	@computed get instrumentChannels() {
		const channels: DisplayChannel[] = [];
		const instruments = this.appStore.player.instruments;

		for (const channel of Object.values(instruments.vibraphone.channels)) {
			channels.push(new DisplayChannel(channel, ChannelColor.DARK));
		}
		for (const channel of Object.values(instruments.drums.channels)) {
			channels.push(new DisplayChannel(channel, ChannelColor.LIGHT));
		}
		for (const channel of Object.values(instruments.bass.channels)) {
			channels.push(new DisplayChannel(channel, ChannelColor.DARK));
		}

		return channels;
	}

	@computed get pegOffsetFunction() {
		return this.pegOffsetFunctions.realistic;
	}
	@observable pegOffsetFunctions = {
		realistic: function (this: ProgrammingWheelDisplayStore, tick: number) {
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
		primary: function (this: ProgrammingWheelDisplayStore, tick: number) {
			if (tick % this.ticksPerNoteSubdivisions.whole === 0) {
				return { stroke: "rgb(115, 115, 115)", strokeWidth: 1 };
			} else if (tick % this.ticksPerNoteSubdivisions.quarter === 0) {
				return { stroke: "rgb(63, 63, 63)", strokeWidth: 1 };
			} else if (tick % this.ticksPerNoteSubdivisions.eighth === 0) {
				return { stroke: "rgb(47, 47, 47)", strokeWidth: 1 };
			}
			return { stroke: "rgb(44, 44, 44)", strokeWidth: 1 };
		},
	};

	@observable subdivision: NoteSubdivision = "quarter";
	@computed get ticksPerNoteSubdivision() {
		return this.ticksPerNoteSubdivisions[this.subdivision];
	}
	@computed get ticksPerNoteSubdivisions() {
		return {
			whole: this.tpq * 4,
			quarter: this.tpq * 1,
			eighth: this.tpq / 2,
			sixteenth: this.tpq / 4,
			triplet: (this.tpq * 2) / 3,
		};
	}

	@computed get pixelPerTick() {
		return this.pixelsPerQuarter / this.tpq;
	}
	tickToPixel(tick: number) {
		return tick * this.pixelPerTick;
	}
	pixelToTick(x: number) {
		return (x / this.pixelsPerQuarter) * this.tpq;
	}
	channelToPixel(channel: number) {
		return channel * this.channelWidth;
	}
	pixelToChannel(y: number) {
		return y / this.channelWidth;
	}

	inVisibleRange(tick: number) {
		// TODO deal with cases where some items on top of screen don't render
		return tick >= this.visibleTopTick && tick <= this.visibleBottomTick;
	}
	@computed get subdivisionLines() {
		return range(0, this.totalTicks, this.ticksPerNoteSubdivision / 2);
	}
	@computed get playbackHeadTick() {
		return this.appStore.player.currentTick % this.totalTicks;
	}

	@observable gearWidth = 24;

	// actions

	@action zoom(change: number) {
		// TODO still a little buggy
		if (!this.mousePos) return;

		const oldPerQuarter = this.pixelsPerQuarter;
		let newPerQuarter = oldPerQuarter - change;

		const minPerQuarter =
			this.visiblePixelHeight / (this.totalTicks / this.tpq);
		if (newPerQuarter < minPerQuarter) {
			newPerQuarter = minPerQuarter;
		}

		const m = this.mousePos.mouseTick;
		const t = this.visibleTopTick;
		const r = oldPerQuarter / newPerQuarter;
		const x = m - t - r * (m - t); // mmm... algebra's hard
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
	@action setSubdivision(subdivision: NoteSubdivision) {
		this.subdivision = subdivision;
	}
	@action moveMouse(mouseTick: number, mouseChannel: number) {
		this.mousePos = { mouseTick, mouseChannel };
	}
	@action setVisibleTopTick(tick: number) {
		this.visibleTopTick = tick;
	}
}
