import { MachineState } from "vmmx-schema";
import { AppStore } from "./app";
import { ChannelGroupTOFIX } from "../toFutureSchema";
import { signal } from "../core/helpers/solid";
import { SomeSignalWrapped } from "../core/helpers/types";

export class MachineStore implements SomeSignalWrapped<MachineState> {
	appStore: AppStore;

	mute = {
		// TODO why can these be undefined in schema??
		bassdrum: signal<boolean | undefined>(false),
		hihat: signal<boolean | undefined>(false),
		snare: signal<boolean | undefined>(false),
		crash: signal<boolean | undefined>(false),
		vibraphone: signal<boolean | undefined>(false),
		bass: signal<boolean | undefined>(false),
	};
	bpm = signal(180);
	flywheelConnected = signal(true);

	constructor(appStore: AppStore) {
		this.appStore = appStore;
	}

	setMuted(channelGroup: ChannelGroupTOFIX, muted: boolean) {
		this.mute[channelGroup](muted);
	}
}
