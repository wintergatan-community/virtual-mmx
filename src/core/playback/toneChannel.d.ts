import { EventBase, JointEventTimeline, VmmxEventListener } from "../eventTimelines/types/other";
import { EventTimeline } from "../eventTimelines/base";
/** Wrapper around ToneJS Parts synced with some EventTimeline */
export declare class ToneChannel<E extends EventBase> {
    private tonePart;
    tickRecord: Record<number, number>;
    constructor(timeline: EventTimeline<E>, onEvent?: VmmxEventListener<E>, muted?: () => boolean);
}
/** A container for two ToneChannels, one for program and one for performance */
export declare class JointToneChannel<E extends EventBase> {
    program: ToneChannel<E>;
    performance: ToneChannel<E>;
    constructor(timelines: JointEventTimeline<E>, onEvent: VmmxEventListener<E>, programMuted: () => boolean);
}
