import { BassString, Note, BassDropEvent, TickedDropEvent } from "vmmx-schema";
import { fromEntries } from "../../helpers";
import { Sampler, Volume, Destination } from "tone";
import PartData from "../partData";
import { computed } from "mobx";
import { global } from "../../../contexts/StoreContext";
import { bassStrings, PegChannelData } from "./instruments";

export class Bass {
	static defaultTuning: Record<BassString, Note> = {
		4: "E2",
		3: "A2",
		2: "D3",
		1: "G3",
	};
	strings: Record<BassString, BassStringData> = fromEntries(
		bassStrings.map((string) => [string, new BassStringData(string)])
	);

	addNoteFromEvent(event: BassDropEvent & TickedDropEvent) {
		this.strings[event.string].partData.add(event.tick);
	}
}
class BassStringData implements PegChannelData {
	bassSynth = new Sampler(
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
	partData = new PartData(this.triggerStrike.bind(this));
	string: BassString;

	constructor(string: BassString) {
		this.string = string;
		const volume = new Volume(-10);
		this.bassSynth.chain(volume, Destination);
	}

	toNote(string: BassString) {
		return (
			global.program.state.bass.tuning[string] ?? Bass.defaultTuning[string]
		);
	}

	@computed get note() {
		return this.toNote(this.string);
	}

	triggerStrike(time?: number) {
		this.bassSynth.triggerAttack(this.toNote(this.string), time);
	}

	moveCapo(fret: number) {}
	pushFret(fret: number) {}
}
