import { range, mapArrayToObj } from "../../core/helpers/functions";
import { AppStore } from "../../stores/app";
import { DropEventTimeline, DropE } from "../../core/eventTimelines/concrete";
import { signal, memo, once, Signal } from "../../core/helpers/solid";

export type NoteSubdivision =
	| "whole"
	| "quarter"
	| "eighth"
	| "sixteenth"
	| "triplet";

const noteSubdivisions = ["whole", "quarter", "eighth", "sixteenth", "triplet"];

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
	timeline: DropEventTimeline<DropE>;
	/** The color of this channel */
	channelColor: ChannelColor;

	constructor(timeline: DropEventTimeline<any>, channelColor: ChannelColor) {
		this.timeline = timeline;
		this.channelColor = channelColor;
	}
}

// These comments would be moved

// interface ProgrammingWheelDisplayStore {
// 	/** The total number of ticks in the wheel */
// 	totalTicks: number;
// 	/** The total number of channels in the wheel */
// 	totalChannels: Getter<number>;
// 	/** The visble width of the wheel in pixels */
// 	visiblePixelWidth: Getter<number>;
// 	/** The visble height of the wheel in pixels */
// 	visiblePixelHeight: number;

// 	/** The topmost tick of the visible wheel */
// 	visibleTopTick: number;
// 	/** The bottommost tick of the visible wheel */
// 	visibleBottomTick: Getter<number>;
// 	/** The leftmost channel of the visible wheel */
// 	visibleLeftChannel: Getter<number>;
// 	/** The rightmost channel of the visible wheel */
// 	visibleRightChannel: Getter<number>;

// 	/** The position of the mouse on the wheel in ticks and channels */
// 	mousePos: WheelMousePos | undefined;
// 	/** The position of the mouse on the wheel snapped to the nearest tick and channel*/
// 	gridSnappedMousePos: Getter<WheelMousePos | undefined>;
// 	/** The number of pixels between quarter notes */
// 	pixelsPerQuarter: number;
// 	/** The width of a channel in pixels */
// 	channelWidth: number;
// 	/** Whether or not translucent pegs should be rendered for the current subdivision in the absence of a drop event */
// 	showEmpties: boolean;
// 	/** An array of DisplayChannel used for channel column headers and instrument identification */
// 	instrumentChannels: Getter<DisplayChannel[]>;
// 	/** An array of numbers representing SubdivsionLine ticks */
// 	subdivisionLines: Getter<number[]>;
// 	/** The current tick of the playback head */
// 	playbackHeadTick: Getter<number>;
// 	/** The gear width on both sides of the wheel */
// 	gearWidth: number;

// 	/** Returns a value from 0 to 1 representing where a peg should be rendered horizontally on its channel based on its subdivision  */
// 	pegOffsetFunction: Getter<PegOffsetFunction>;
// 	/** An object containing keyed PegOffsetFunctions */
// 	pegOffsetFunctions: Record<PegOffsetFunctionKey, PegOffsetFunction>;
// 	/** Returns an object containing stroke and strokeWidth properties based on a SubdivisionLine's subdivision  */
// 	subdivisionLineFunction: Getter<SubdivisionLineFunction>;
// 	/** An object containing keyed SubdivisionLineFunctions */
// 	subdivisionLineFunctions: Getter<
// 		Record<SubdivisionLineFunctionKey, SubdivisionLineFunction>
// 	>;

// 	subdivision: NoteSubdivision;
// 	/** The number of ticks in one unit of the current note subdivision (quarter, triplet, etc.) */
// 	ticksPerNoteSubdivision: Getter<number>;
// 	/** An object containing keyed ticks per one unit of the current note subdivisions */
// 	ticksPerNoteSubdivisions: Getter<Record<NoteSubdivision, number>>;

// 	tickToPixel(tick: number): number;
// 	pixelToTick(x: number): number;
// 	channelToPixel(channel: number): number;
// 	pixelToChannel(channel: number): number;

// 	/** Returns whether or not a tick channel pair is within the visible viewing range */
// 	inVisibleRange(tick: number, channel: number): boolean;

// 	tpq: Getter<number>;
// 	pixelPerTick: Getter<number>;
// }

export class ProgrammingWheelDisplayStore {
	appStore: AppStore;

	constructor(appStore: AppStore) {
		this.appStore = appStore;

		this.tpq = () => this.appStore.performance.program.metadata.tpq;
		this.instrumentChannels = once(() => {
			const channels: DisplayChannel[] = [];
			const instruments = this.appStore.performance.program.dropEventTimelines;

			for (const channel of Object.values(instruments.vibraphone)) {
				channels.push(new DisplayChannel(channel, ChannelColor.DARK));
			}
			for (const channel of Object.values(instruments.drums)) {
				channels.push(new DisplayChannel(channel, ChannelColor.LIGHT));
			}
			for (const channel of Object.values(instruments.bass)) {
				channels.push(new DisplayChannel(channel, ChannelColor.DARK));
			}

			return channels;
		});
		this.ticksPerNoteSubdivisions = () => ({
			whole: this.tpq() * 4,
			quarter: this.tpq() * 1,
			eighth: this.tpq() / 2,
			sixteenth: this.tpq() / 4,
			triplet: (this.tpq() * 2) / 3,
		});
		this.ticksPerNoteSubdivision = memo(
			() => this.ticksPerNoteSubdivisions()[this.subdivision()]
		);
		this.allSubdivisionLines = mapArrayToObj(noteSubdivisions, (n) =>
			range(0, 61440, this.ticksPerNoteSubdivisions()[n as NoteSubdivision])
		);
		this.subdivisionLineFunctions = () => ({
			primary: (tick: number) => {
				if (tick % this.ticksPerNoteSubdivisions().whole === 0) {
					return { stroke: "rgb(115, 115, 115)", strokeWidth: 1 };
				} else if (tick % this.ticksPerNoteSubdivisions().quarter === 0) {
					return { stroke: "rgb(63, 63, 63)", strokeWidth: 1 };
				} else if (tick % this.ticksPerNoteSubdivisions().eighth === 0) {
					return { stroke: "rgb(47, 47, 47)", strokeWidth: 1 };
				}
				return { stroke: "rgb(44, 44, 44)", strokeWidth: 1 };
			},
		});
		this.subdivisionLineFunction = memo(
			() => this.subdivisionLineFunctions().primary
		);

		this.subdivision = signal<NoteSubdivision>("sixteenth");

		this.subdivisionLines = memo(
			() => this.allSubdivisionLines[this.subdivision()]
		);
		this.playbackHeadTick = () =>
			appStore.player.currentTick() % this.totalTicks();

		this.setSubdivision = (subdivision: NoteSubdivision) => {
			this.subdivision(subdivision);
		};
	}

	visiblePixelWidth = signal(0);
	visiblePixelHeight = signal(0);

	tpq: Signal<number>;
	totalTicks = () => 61440 / 4;

	showEmpties = signal(false);
	instrumentChannels: Signal<DisplayChannel[]>;

	pegOffsetFunction = () => this.pegOffsetFunctions().realistic;

	pegOffsetFunctions = () => ({
		realistic: (tick: number) => {
			if (tick % this.ticksPerNoteSubdivisions().eighth === 0) {
				return 0.5;
			} else if (tick % this.ticksPerNoteSubdivisions().sixteenth === 0) {
				return 0.1;
			} else if (tick % this.ticksPerNoteSubdivisions().triplet === 0) {
				return 0.9;
			}
			return 0;
		},
	});
	subdivisionLineFunctions: Signal<
		Record<SubdivisionLineFunctionKey, SubdivisionLineFunction>
	>;
	subdivisionLineFunction: Signal<SubdivisionLineFunction>;

	subdivision = signal<NoteSubdivision>("sixteenth");

	ticksPerNoteSubdivisions: Signal<Record<NoteSubdivision, number>>;
	ticksPerNoteSubdivision: Signal<number>;

	allSubdivisionLines: Record<string, number[]>;

	subdivisionLines: Signal<number[]>;
	// return appStore.player.currentTick % this.totalTicks;
	playbackHeadTick: Signal<number>;

	setSubdivision: (subdivision: NoteSubdivision) => void;
}
