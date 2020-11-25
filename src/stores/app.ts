import { mapArrayToObj } from "../core/helpers/functions";
import { bassStrings, drumTypes, vibraphoneBars } from "../toFutureSchema";
import { PerformanceStore } from "./performance";
import { JointEventTimeline } from "../core/eventTimelines/types/other";
import MidiUse from "../midiTesting";
import { createContext } from "solid-js";
import { Program } from "vmmx-schema";
import { VmmxPlayer } from "../core/playback/player";
import { CapoE, MuteE } from "../core/eventTimelines/concrete";
import sampleProgram from "../sampleProgram.json";

export const AppContext = createContext<AppStore>();

export class AppStore {
	performance = new PerformanceStore();

	jointTimelines = {
		// TODO cant figure out how to let TypeScript let me do this better
		bass: mapArrayToObj(
			bassStrings,
			(bassString) =>
				new JointEventTimeline({
					program: this.prog.bass[bassString],
					performance: this.perf.bass[bassString],
				})
		),
		drums: mapArrayToObj(
			drumTypes,
			(drumType) =>
				new JointEventTimeline({
					program: this.prog.drums[drumType],
					performance: this.perf.drums[drumType],
				})
		),
		vibraphone: mapArrayToObj(
			vibraphoneBars,
			(vibraphoneBar) =>
				new JointEventTimeline({
					program: this.prog.vibraphone[vibraphoneBar],
					performance: this.perf.vibraphone[vibraphoneBar],
				})
		),
	};

	midiUse = new MidiUse((note) => {
		const barStores = Object.values(
			this.performance.program.state.vibraphone.barStores
		);
		for (const barStore of barStores) {
			if (barStore.note === note) {
				this.jointTimelines.vibraphone[barStore.bar].performance.triggerEvent();
				break;
			}
		}
	});

	player = new VmmxPlayer(this);

	loadProgram(program: Program) {
		this.performance.program.loadProgram(program);
	}

	get prog() {
		return this.performance.program.dropEventTimelines;
	}
	get perf() {
		return this.performance.eventTimelines.performanceDrop;
	}

	setupTesting() {
		this.loadProgram(sampleProgram as Program);
		const mute = this.performance.eventTimelines.machine.channelMute;

		const debugAddMute = (m: boolean, tick: number) => {
			const difs = mute.vibraphone.getAddDifs(new MuteE({ mute: m, tick }));
			if (difs) {
				mute.vibraphone.applyDifs(difs);
			} else {
				console.log("Cant place");
			}
		};

		debugAddMute(true, 500);
		debugAddMute(false, 700);

		const capo = this.performance.eventTimelines.bass.capo[1];
		const debugAddCapo = (moveFret: number, tick: number) => {
			const difs = capo.getAddDifs(new CapoE({ moveFret, tick }));
			if (difs) {
				capo.applyDifs(difs);
			} else {
				console.log("Cant place");
			}
		};

		debugAddCapo(0, 100);
		debugAddCapo(2, 200);
		debugAddCapo(15, 500);
		debugAddCapo(8, 640);
	}
}
