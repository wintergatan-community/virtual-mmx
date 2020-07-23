import { NoteSubdivision } from "../../core/helpers/types";
import { VmmxInstrumentChannel } from "../../core/playback/types";
import { AppStore } from "../../stores/app";
interface WheelMousePos {
    mouseTick: number;
    mouseChannel: number;
}
declare type PegOffsetFunction = (tick: number) => number;
declare type PegOffsetFunctionKey = "realistic";
declare type SubdivisionLineFunction = (tick: number) => {
    stroke: string;
    strokeWidth: number;
};
declare type SubdivisionLineFunctionKey = "primary";
/** The background color to use for displaying a channel */
export declare enum ChannelColor {
    LIGHT = "rgb(60, 60, 60)",
    DARK = "rgb(39, 39, 39)"
}
/** A single VmmxInstrumentChannel with additional display related information. */
export declare class DisplayChannel {
    /** The vmmx instrument channel to display */
    vmmxInstrumentChannel: VmmxInstrumentChannel;
    /** The color of this channel */
    channelColor: ChannelColor;
    constructor(vmmxInstrumentChannel: VmmxInstrumentChannel, channelColor: ChannelColor);
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
    pegOffsetFunctions: {
        [key in PegOffsetFunctionKey]: PegOffsetFunction;
    };
    /** Returns an object containing stroke and strokeWidth properties based on a SubdivisionLine's subdivision  */
    subdivisionLineFunction: SubdivisionLineFunction;
    /** An object containing keyed SubdivisionLineFunctions */
    subdivisionLineFunctions: {
        [key in SubdivisionLineFunctionKey]: SubdivisionLineFunction;
    };
    /** The number of ticks in one unit of the current note subdivision (quarter, triplet, etc.) */
    ticksPerNoteSubdivision: number;
    /** An object containing keyed ticks per one unit of the current note subdivisions */
    ticksPerNoteSubdivisions: {
        [type in NoteSubdivision]: number;
    };
    tickToPixel(tick: number): number;
    pixelToTick(x: number): number;
    channelToPixel(channel: number): number;
    pixelToChannel(channel: number): number;
    /** Returns whether or not a tick channel pair is within the visible viewing range */
    inVisibleRange(tick: number, channel: number): boolean;
}
export declare class ProgrammingWheelDisplayStore implements ProgrammingWheelDisplayInterface {
    appStore: AppStore;
    get tpq(): 240;
    constructor(appStore: AppStore);
    get totalTicks(): number;
    get totalChannels(): number;
    get visiblePixelWidth(): number;
    visiblePixelHeight: number;
    visibleTopTick: number;
    get visibleBottomTick(): number;
    visibleLeftChannel: number;
    get visibleRightChannel(): number;
    mousePos: WheelMousePos | undefined;
    get gridSnappedMousePos(): {
        mouseTick: number;
        mouseChannel: number;
    } | undefined;
    pixelsPerQuarter: number;
    channelWidth: number;
    showEmpties: boolean;
    get instrumentChannels(): DisplayChannel[];
    get pegOffsetFunction(): (this: ProgrammingWheelDisplayStore, tick: number) => 0 | 0.9 | 0.5 | 0.1;
    pegOffsetFunctions: {
        realistic: (this: ProgrammingWheelDisplayStore, tick: number) => 0 | 0.9 | 0.5 | 0.1;
    };
    get subdivisionLineFunction(): (this: ProgrammingWheelDisplayStore, tick: number) => {
        stroke: string;
        strokeWidth: number;
    };
    subdivisionLineFunctions: {
        primary: (this: ProgrammingWheelDisplayStore, tick: number) => {
            stroke: string;
            strokeWidth: number;
        };
    };
    subdivision: NoteSubdivision;
    get ticksPerNoteSubdivision(): number;
    get ticksPerNoteSubdivisions(): {
        whole: number;
        quarter: number;
        eighth: number;
        sixteenth: number;
        triplet: number;
    };
    get pixelPerTick(): number;
    tickToPixel(tick: number): number;
    pixelToTick(x: number): number;
    channelToPixel(channel: number): number;
    pixelToChannel(y: number): number;
    inVisibleRange(tick: number): boolean;
    get subdivisionLines(): number[];
    get playbackHeadTick(): number;
    gearWidth: number;
    zoom(change: number): void;
    scroll(dy: number): void;
    setSubdivision(subdivision: NoteSubdivision): void;
    moveMouse(mouseTick: number, mouseChannel: number): void;
    setVisibleTopTick(tick: number): void;
}
export {};
