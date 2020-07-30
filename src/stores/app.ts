import { Program } from "vmmx-schema";
import { VmmxPlayer } from "../core/playback/player";
import { mapArrayToObj } from "../core/helpers/functions";
import { bassStrings, drumTypes, vibraphoneBars } from "../toFutureSchema";
import { JointEventTimeline } from "./eventTimeline";
import { PerformanceStore } from "./performance";

export class AppStore {
	performance = new PerformanceStore(this);

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
}
