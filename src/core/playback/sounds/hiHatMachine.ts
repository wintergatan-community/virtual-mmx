import { VmmxSoundChannel } from "../types";
import { ToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { Sampler, context, Volume, Destination } from "tone";

export class HiHatMachineSound implements VmmxSoundChannel {
	hiHatMachineSample?: Sampler;
	toneChannel: ToneChannel<any>;

	constructor(appStore: AppStore) {
		this.toneChannel = new ToneChannel(
			appStore.performance.eventTimelines.hiHatMachine.mode,
			this.triggerStrike.bind(this)
		);
	}

	triggerStrike(time?: number | undefined): void {
		if (this.hiHatMachineSample?.loaded) {
			this.hiHatMachineSample.triggerAttack("C5", time ?? context.currentTime);
		}
	}
	onToneLoad(): void {
		const hiHatMachineSample = new Sampler(
			{
				C5: "C5.wav",
			},
			undefined,
			"./samples/hiHatMachine/tap.wav"
		);
		this.hiHatMachineSample = hiHatMachineSample;

		const volume = new Volume(-12);
		hiHatMachineSample.chain(volume, Destination);
	}
}
