import { TickedDropEvent } from "vmmx-schema";
import { Transport, context } from "tone";
import { observable, action, autorun, computed, runInAction } from "mobx";
import { AppStore } from "../../stores/app";
import { VibraphoneInstrument } from "../instruments/vibraphone";
import { BassInstrument } from "../instruments/bass";
import { DrumsInstrument } from "../instruments/drums";

export class VmmxPlayer {
	appStore: AppStore;

	@observable running = false;
	@observable currentTick = 0;
	@observable toneLoaded = false;

	instruments: {
		vibraphone: VibraphoneInstrument;
		bass: BassInstrument;
		drums: DrumsInstrument;
	};

	constructor(appStore: AppStore) {
		this.appStore = appStore;

		this.instruments = {
			vibraphone: new VibraphoneInstrument(this.program.state.vibraphone),
			bass: new BassInstrument(this.program.state.bass),
			drums: new DrumsInstrument(this.program.state.drums),
		};

		this.updateCurrentTickLoop();

		autorun(() => {
			Transport.bpm.value = this.program.state.machine.bpm;
		});
		autorun(() => {
			Transport.PPQ = this.program.metadata.tpq;
		});
		// TODO disposers?

		window.onclick = () => {
			if (this.toneLoaded) return;
			console.log("Tone Instruments Loaded");
			Object.values(this.instruments).forEach((i) => i.onToneLoad());
			runInAction(() => (this.toneLoaded = true));
		};
	}

	@computed get program() {
		return this.appStore.program;
	}

	@action.bound updateCurrentTickLoop() {
		requestAnimationFrame(this.updateCurrentTickLoop);
		this.currentTick = Transport.ticks;
		// TODO disposer?
	}

	@action loadEvents(dropEvents: TickedDropEvent[]) {
		dropEvents.forEach((event) => {
			// TODO schema should use "drums" instead of "drum"
			const kind: "bass" | "drums" | "vibraphone" =
				event.kind === "drum" ? "drums" : event.kind;

			const instrument = this.instruments[kind];

			instrument.addNoteFromEvent(event as any); // TODO do typescript better
		});
	}

	@action play() {
		this.running = true;
		if (context.state !== "running") {
			context.resume();
		}
		Transport.start();
	}

	@action pause() {
		this.running = false;
		Transport.pause();
	}

	@action restart() {
		Transport.position = 0;
	}
}
