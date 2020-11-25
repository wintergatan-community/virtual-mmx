import { VmmxSound } from "../types";
import { ToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { Sampler, context, Volume, Destination } from "tone";
import { HiHatMachineModeE } from "../../eventTimelines/concrete";

export class HiHatMachineSound extends VmmxSound<HiHatMachineModeE> {
	hiHatMachineSample?: Sampler;
	toneChannel: ToneChannel<HiHatMachineModeE>;

	constructor(appStore: AppStore) {
		super();
		this.toneChannel = new ToneChannel(
			appStore.performance.eventTimelines.hiHatMachine.mode,
			this.triggerStrike
		);
	}

	triggerStrike = (_?: HiHatMachineModeE, time?: number) => {
		if (this.hiHatMachineSample?.loaded) {
			this.hiHatMachineSample.triggerAttack("C5", time ?? context.currentTime);
		}
	};
	onToneLoad() {
		const hiHatMachineSample = new Sampler({
			A1: `./samples/drums/hihat.wav`,
		});
		this.hiHatMachineSample = hiHatMachineSample;

		const volume = new Volume(-12);
		hiHatMachineSample.chain(volume, Destination);
	}
}
