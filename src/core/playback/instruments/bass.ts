import { BassString, BassDropEvent, TickedDropEvent } from "vmmx-schema";
import { Sampler, Volume, Destination, PitchShift } from "tone";
import { computed, autorun } from "mobx";
import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { mapToObject } from "../../helpers/functions";
import { BassStore, BassStringStore } from "../../../stores/bass";
import { ChannelPart } from "../channelPart";

export class BassInstrument
	implements VmmxInstrument<BassString, BassDropEvent> {
	private bassStore: BassStore;
	readonly channels: Record<BassString, BassStringChannel>;

	constructor(bassStore: BassStore) {
		this.bassStore = bassStore;

		this.channels = mapToObject(
			this.bassStore.stringStores,
			(_, stringStore) => new BassStringChannel(stringStore)
		);
	}

	onToneLoad() {
		Object.values(this.channels).forEach((c) => c.onToneLoad());
	}

	addNoteFromEvent(event: BassDropEvent & TickedDropEvent) {
		this.channels[event.string].channelPart.add(event.tick);
	}
}

export class BassStringChannel implements VmmxInstrumentChannel {
	private stringStore: BassStringStore;
	private bassSynth?: Sampler;
	readonly channelPart = new ChannelPart(this.triggerStrike.bind(this));

	constructor(stringStore: BassStringStore) {
		this.stringStore = stringStore;
	}

	onToneLoad() {
		this.bassSynth = new Sampler(
			{
				"A#2": "As2.wav",
				"A#3": "As3.wav",
				"A#4": "As4.wav",
				"A#5": "As5.wav",
				"C#2": "Cs2.wav",
				"C#3": "Cs3.wav",
				"C#4": "Cs4.wav",
				"C#5": "Cs5.wav",
				E2: "E2.wav",
				E3: "E3.wav",
				E4: "E4.wav",
				E5: "E5.wav",
				G2: "G2.wav",
				G3: "G3.wav",
				G4: "G4.wav",
				G5: "G5.wav",
			},
			undefined,
			"./samples/bass/"
		);

		const volume = new Volume(-10);
		const pitchShifter = new PitchShift();
		autorun(() => {
			pitchShifter.pitch = this.stringStore.capo ?? 0;
		});
		this.bassSynth.chain(volume, pitchShifter, Destination);
	}

	@computed get note() {
		return this.stringStore.tuning;
	}

	triggerStrike(time?: number) {
		if (!this.bassSynth?.loaded) return;
		this.bassSynth.triggerAttack(this.note, time);
	}
}
