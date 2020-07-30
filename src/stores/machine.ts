import { MachineState } from "vmmx-schema";
import { AppStore } from "./app";
import { ChannelGroupTOFIX } from "../toFutureSchema";
import { observable } from "mobx";

export class MachineStore implements MachineState {
	appStore: AppStore;

	mute: Record<ChannelGroupTOFIX, boolean> = {
		bassdrum: false,
		hihat: false,
		snare: false,
		crash: false,
		vibraphone: false,
		bass: false,
	};
	@observable bpm = 180;
	flywheelConnected = true;

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}

	setMuted(channelGroup: ChannelGroupTOFIX, muted: boolean) {
		this.mute[channelGroup] = muted;
	}
}
