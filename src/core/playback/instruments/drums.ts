import { DrumDropEvent, TickedDropEvent } from "vmmx-schema";

export class Drums {
	// drums = {
	// 	bassdrum: new BassDrumData,
	// 	hihat: new HiHatData(),
	// 	snare: new SnareData()
	// };

	addNoteFromEvent(event: DrumDropEvent & TickedDropEvent) {
		// this.channels[event.channel].partData.add(event.tick)
	}
}
// class SnareData {
// 	snareSynth = new Buffer(
// 		{
// 			C5: "C5.wav",
// 		},
// 		undefined,
// 		"./samples/drum/"
// 	);
// 	partData: PartData;
// 	triggerStrike(tick?: number): void;
// }
// class HiHatData {
// 	hiHatSynth: any;
// 	partData: PartData;
// 	triggerStrike(tick?: number): void;
// 	setHatOpen(amount: number): void;
// }
// class BassDrumData {
// 	bassDrumSynth: any;
// 	partData: PartData;
// 	triggerStrike(tick?: number): void;
// }
