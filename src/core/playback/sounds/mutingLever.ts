import { VmmxSoundChannel } from "../types";
import { AppStore } from "../../../stores/app";
import { Sampler, context, Volume, Destination } from "tone";
import { values } from "../../helpers/functions";
import { MuteE } from "../../eventTimelines/concrete";
import { ToneChannel } from "../toneChannel";

export class MutingLeverSound extends VmmxSoundChannel<MuteE> {
	muteChannels: ToneChannel<MuteE>[];
	mutingLeverSample?: Sampler;

	constructor(appStore: AppStore) {
		super();

		const mutes = appStore.performance.eventTimelines.machine.channelMute;
		this.muteChannels = values(mutes).map(
			(mute) => new ToneChannel(mute, this.triggerStrike)
		);
	}

	triggerStrike = (_?: MuteE, time?: number) => {
		if (this.mutingLeverSample?.loaded) {
			this.mutingLeverSample.triggerAttack("C5", time ?? context.currentTime);
		}
	};
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
