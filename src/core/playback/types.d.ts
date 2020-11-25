import { JointToneChannel } from "./toneChannel";
import { EventBase, VmmxEventListener } from "../eventTimelines/types/other";
/** An instrument is any source of sound that operates on DropEvents and is split into channels */
export interface VmmxInstrument<ChannelType extends string | number | symbol, E extends EventBase> {
    /** A record of instrument channels for each vibraphone bar, drum type, etc. */
    channels: Record<ChannelType, VmmxInstrumentChannel<E>>;
    /** Invoked when user first interacts with page */
    onToneLoad(): void;
}
/** Each drop channel that operates on DropEvents */
export declare abstract class VmmxChannel<E extends EventBase> {
    /** Function to be called when event is fired */
    abstract triggerStrike: VmmxEventListener<E>;
    onEvent(event: E): void;
}
/** Channels specifically for instruments with both program and performance ToneChannels */
export declare abstract class VmmxInstrumentChannel<E extends EventBase> extends VmmxChannel<E> {
    /** A pair of ToneChannels for both performance and program DropEvents */
    abstract toneChannels: JointToneChannel<E>;
}
/** Template for specifically for non-instrument sounds */
export declare abstract class VmmxSound<E extends EventBase> extends VmmxChannel<E> {
    /** Invoked when user first interacts with page */
    abstract onToneLoad(): void;
}
