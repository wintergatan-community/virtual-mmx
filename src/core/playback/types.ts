import { JointToneChannel } from "./toneChannel";

export interface VmmxInstrument<ChannelType extends string | number | symbol> {
	channels: Record<ChannelType, VmmxInstrumentChannel>;
	onToneLoad(): void; // preferably async, but get "Uncaught ReferenceError: regeneratorRuntime is not defined"
}

export interface VmmxInstrumentChannel {
	toneChannels: JointToneChannel<any>; // TODO maybe not "any", not sure yet
	triggerStrike(time?: number): void;
}
