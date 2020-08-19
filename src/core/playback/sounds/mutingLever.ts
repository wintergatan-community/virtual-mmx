import { VmmxSoundChannel } from "../types";
import { ToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { Sampler, context, Volume, Destination } from "tone";

export class MutingLeverSound implements VmmxSoundChannel {
	mutingLeverSample?: Sampler;

	constructor(appStore: AppStore) {
		appStore.performance.eventTimelines.hiHatMachine.mode.addEventListener(
			(_, time) => this.triggerStrike(time)
		);
	}

	triggerStrike(time?: number | undefined): void {
		if (this.mutingLeverSample?.loaded) {
			this.mutingLeverSample.triggerAttack("C5", time ?? context.currentTime);
		}
	}
	onToneLoad(): void {
		const mutingLeverSample = new Sampler(
			{
				C5: "C5.wav",
			},
			undefined,
			"./samples/mutingLever/flip.wav"
		);
		this.mutingLeverSample = mutingLeverSample;

		const volume = new Volume(-12);
		mutingLeverSample.chain(volume, Destination);
	}
}
