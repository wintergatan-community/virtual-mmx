import { Program } from "vmmx-schema";
import { VmmxPlayer } from "../core/playback/player";
import { observable, computed } from "mobx";

interface GlobalStoreInterface {
	program: Program;
	player: VmmxPlayer;
	tpq: number;
}

export class GlobalStore implements GlobalStoreInterface {
	@observable program: Program = {
		dropEvents: [],
		metadata: {
			author: "Martin Mollin",
			title: "Marble Machine (Piano Version)",
			length: 61440,
			tpq: 240,
			version: "0.1.0-beta",
		},
		state: {
			bass: {
				capos: {},
				tuning: {},
			},
			hihat: {
				closed: true,
			},
			hihatMachine: {
				setting: "",
			},
			machine: {
				bpm: 150,
				flywheelConnected: true,
				mute: {},
			},
			vibraphone: {
				vibratoSpeed: 1,
				vibratoEnabled: true,
				notes: {
					1: "A3",
					2: "B3",
					3: "C4",
					4: "D4",
					5: "E4",
					6: "F4",
					7: "G4",
					8: "A4",
					9: "B4",
					10: "C5",
					11: "D5",
				},
			},
		},
	};

	@observable player = new VmmxPlayer(this.program);

	@computed get tpq() {
		return this.program.metadata.tpq;
	}
}
