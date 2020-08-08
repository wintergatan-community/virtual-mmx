import { MachineState } from "vmmx-schema";
import { AppStore } from "./app";
import { ChannelGroupTOFIX } from "../toFutureSchema";
import { observable, action } from "mobx";

export class MachineStore implements MachineState {
	appStore: AppStore;

	@observable mute: Record<ChannelGroupTOFIX, boolean> = {
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

	@action setMuted(channelGroup: ChannelGroupTOFIX, muted: boolean) {
		this.mute[channelGroup] = muted;
	}
}
