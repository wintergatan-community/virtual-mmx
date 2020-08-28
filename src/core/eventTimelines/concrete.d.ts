import { LoneEventTimeline } from "./variations/lone";
import { EventBase } from "./types/other";
import { SegmentEventTimeline } from "./variations/segment";
import { PolylineEventTimeline } from "./variations/polyline";
import { Curve } from "./types/curves";
import { HiHatMachineMode } from "../../toFutureSchema";
export declare class DropEventTimeline<E extends DropE> extends LoneEventTimeline<E> {
}
export declare class BassDropEventTimeline extends DropEventTimeline<BassDropE> {
}
export declare type DrumsDropEventTimeline = HiHatDropEventTimeline | DropEventTimeline<DropE>;
export declare class HiHatDropEventTimeline extends DropEventTimeline<HiHatDropE> {
}
export declare class VibraphoneDropEventTimeline extends DropEventTimeline<VibraphoneDropE> {
}
export declare class DropE extends EventBase {
}
export declare class BassDropE extends DropE {
    fret?: number;
    constructor(data: {
        fret?: number;
        tick: number;
    });
}
export declare type DrumsDropE = HiHatDropE | DropE;
export declare class HiHatDropE extends DropE {
    hatOpen?: number;
    constructor(data: {
        hatOpen?: number;
        tick: number;
    });
}
export declare class VibraphoneDropE extends DropE {
}
export declare class MuteEventTimeline extends SegmentEventTimeline<MuteE> {
    isStarting(event: MuteE): boolean;
}
export declare class MuteE extends EventBase {
    mute: boolean;
    constructor(data: {
        mute: boolean;
        tick: number;
    });
}
export declare class VibraphoneVibratoEventTimeline extends PolylineEventTimeline<VibraphoneVibratoE> {
    eventCanBePlacedOnCurve(event: VibraphoneVibratoE, curve: Curve<VibraphoneVibratoE> | null): boolean;
}
export declare class VibraphoneVibratoE extends EventBase {
    enabled?: boolean;
    speed?: number;
    constructor(data: {
        enabled?: boolean;
        speed: number;
        tick: number;
    });
}
export declare class CapoEventTimeline extends PolylineEventTimeline<CapoE> {
    eventCanBePlacedOnCurve(): boolean;
}
export declare class CapoE extends EventBase {
    moveFret: number;
    constructor(data: {
        moveFret: number;
        tick: number;
    });
}
export declare class HiHatMachineModeEventTimeline extends PolylineEventTimeline<HiHatMachineModeE> {
    eventCanBePlacedOnCurve(): boolean;
}
export declare class HiHatMachineModeE extends EventBase {
    mode: HiHatMachineMode;
    constructor(data: {
        mode: HiHatMachineMode;
        tick: number;
    });
}
