import { VmmxSoundChannel } from "../types";
import { AppStore } from "../../../stores/app";
import { Sampler, context, Volume, Destination } from "tone";
import { values } from "../../helpers/functions";

export class MutingLeverSound implements VmmxSoundChannel {
	mutingLeverSample?: Sampler;

	constructor(appStore: AppStore) {
		for (const timeline of values(
			appStore.performance.eventTimelines.machine.channelMute
		)) {
			timeline.addEventListener((_, time) => this.triggerStrike(time));
		}
	}

	triggerStrike(time?: number | undefined) {
		if (this.mutingLeverSample?.loaded) {
			this.mutingLeverSample.triggerAttack("C5", time ?? context.currentTime);
		}
	}
	onToneLoad() {
		const mutingLeverSample = new Sampler(
			{
				C5: "flip.wav",
			},
			undefined,
			"./samples/mutingLever/"
		);
		this.mutingLeverSample = mutingLeverSample;

		const volume = new Volume(-12);
		mutingLeverSample.chain(volume, Destination);
	}
}
