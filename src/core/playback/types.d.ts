import { JointToneChannel } from "./toneChannel";
import { EventBase, VmmxEventListener } from "../eventTimelines/types/other";
/** An instrument is any source of sound that operates on DropEvents and is split into drop channels */
export interface VmmxInstrument<ChannelType extends string | number | symbol, E extends EventBase> {
    channels: Record<ChannelType, VmmxInstrumentChannel<E>>;
    onToneLoad(): void;
}
export declare abstract class VmmxChannel<E extends EventBase> {
    abstract triggerStrike: VmmxEventListener<E>;
    onEvent(event: E): void;
}
export declare abstract class VmmxInstrumentChannel<E extends EventBase> extends VmmxChannel<E> {
    abstract toneChannels: JointToneChannel<E>;
}
export declare abstract class VmmxSoundChannel<E extends EventBase> extends VmmxChannel<E> {
    abstract onToneLoad(): void;
}
