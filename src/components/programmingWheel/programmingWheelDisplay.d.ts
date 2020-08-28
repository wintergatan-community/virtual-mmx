import { AppStore } from "../../stores/app";
import { DropEventTimeline, DropE } from "../../core/eventTimelines/concrete";
import { Signal } from "../../core/helpers/solid";
export declare type NoteSubdivision = "whole" | "quarter" | "eighth" | "sixteenth" | "triplet";
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
    timeline: DropEventTimeline<DropE>;
    /** The color of this channel */
    channelColor: ChannelColor;
    constructor(timeline: DropEventTimeline<any>, channelColor: ChannelColor);
}
export declare class ProgrammingWheelDisplayStore {
    appStore: AppStore;
    constructor(appStore: AppStore);
    visiblePixelWidth: Signal<number>;
    visiblePixelHeight: Signal<number>;
    tpq: Signal<number>;
    totalTicks: () => number;
    showEmpties: Signal<boolean>;
    instrumentChannels: Signal<DisplayChannel[]>;
    pegOffsetFunction: () => (tick: number) => 0 | 0.5 | 0.1 | 0.9;
    pegOffsetFunctions: () => {
        realistic: (tick: number) => 0 | 0.5 | 0.1 | 0.9;
    };
    subdivisionLineFunctions: Signal<Record<SubdivisionLineFunctionKey, SubdivisionLineFunction>>;
    subdivisionLineFunction: Signal<SubdivisionLineFunction>;
    subdivision: Signal<NoteSubdivision>;
    ticksPerNoteSubdivisions: Signal<Record<NoteSubdivision, number>>;
    ticksPerNoteSubdivision: Signal<number>;
    allSubdivisionLines: Record<string, number[]>;
    subdivisionLines: Signal<number[]>;
    playbackHeadTick: Signal<number>;
    setSubdivision: (subdivision: NoteSubdivision) => void;
}
export {};
