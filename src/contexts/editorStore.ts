import { NoteSubdivision } from "../core/types";
import { Note } from "vmmx-schema/note_names";
import { GlobalStore } from "./globalStore";
import { observable, computed, action } from "mobx";
import { range } from "../core/helpers";

type SubdivisionChecker = (tick: number) => number;
type SubdivisionCheckerKey = "realistic"; // TODO more

type ScoreDivisionChecker = (
	tick: number
) => { stroke: string; strokeWidth: number };
type ScoreDivisionCheckerKey = "primary"; // TODO more

export interface EditorStoreInterface {
	// settable
	pixelsPerQuarter: number;
	viewingEditorTick: number; // tick at top of editor (can be decimal)
	viewingEditorChannel: number; // channel at left of editor (can be decimal)
	showEmpties: boolean;

	// constants
	subdivisionCheckers: { [key in SubdivisionCheckerKey]: SubdivisionChecker };
	scoreDivisionCheckers: {
		[key in ScoreDivisionCheckerKey]: ScoreDivisionChecker;
	};
	channelWidth: number;

	// actionable
	channels: Note[];
	subdivisionChecker: SubdivisionChecker;
	scoreDivisionChecker: ScoreDivisionChecker;

	// other
	programEditorWidth: number;
	programEditorHeight: number;
	programEditorVisibleWidth: number;
	programEditorVisibleHeight: number;
	visibleEndTick: number;

	tickToPixel: (tick: number) => number;
	pixelToTick: (x: number) => number;
	channelToPixel: (channel: number) => number;
	pixelToChannel: (channel: number) => number;
	inVisibleRange: (tick: number) => boolean;

	ticksPerNoteSubdivision: number;
	ticksPerNoteSubdivisions: { [type in NoteSubdivision]: number };
}

export class EditorStore implements EditorStoreInterface {
	g: GlobalStore;

	@observable pixelsPerQuarter = 20;
	@observable viewingEditorTick = 0;
	@observable viewingEditorChannel = 0;
	@observable showEmpties = false;
	@observable programEditorVisibleHeight = 400;
	@computed get programEditorVisibleWidth() {
		return this.channels.length * this.channelWidth;
	}
	@computed get visibleEndTick() {
		return (
			this.viewingEditorTick + this.pixelToTick(this.programEditorVisibleHeight)
		);
	}
	@computed get inVisibleRange() {
		// TODO deal with cases where some items on top of screen don't render
		return (tick: number) =>
			tick >= this.viewingEditorTick && tick <= this.visibleEndTick;
	}

	// constants
	@observable subdivisionCheckers = {
		realistic: function (this: EditorStore, tick: number) {
			if (tick % this.ticksPerNoteSubdivisions.eighth === 0) {
				return 0.5;
			} else if (tick % this.ticksPerNoteSubdivisions.sixteenth === 0) {
				return 0.1;
			} else if (tick % this.ticksPerNoteSubdivisions.triplet === 0) {
				return 0.9;
			}
			return 0;
		},
	};
	@observable scoreDivisionCheckers = {
		primary: function (this: EditorStore, tick: number) {
			if (tick % this.ticksPerNoteSubdivisions.whole === 0) {
				return { stroke: "rgb(115, 115, 115)", strokeWidth: 1 };
			} else if (tick % this.ticksPerNoteSubdivisions.quarter === 0) {
				return { stroke: "rgb(63, 63, 63)", strokeWidth: 1 };
			} else if (tick % this.ticksPerNoteSubdivisions.eighth === 0) {
				return { stroke: "rgb(43, 43, 43)", strokeWidth: 1 };
			}
			return { stroke: "rgb(33, 33, 33)", strokeWidth: 1 };
		},
	};
	@computed get scoreDivisionChecker() {
		return this.scoreDivisionCheckers.primary;
	}
	@observable channelWidth = 55;

	// actionable
	@computed get channels() {
		return Object.values(this.g.program.state.vibraphone.notes);
	}
	@computed get subdivisionChecker() {
		return this.subdivisionCheckers.realistic;
	}

	// other
	@computed get programEditorWidth() {
		return this.channels.length * this.channelWidth;
	}
	@observable programEditorHeight = this.g.tpq * 3;

	@computed get tickToPixel() {
		return (tick: number) => (tick * this.pixelsPerQuarter) / this.g.tpq;
	}
	@computed get pixelToTick() {
		return (x: number) => (x / this.pixelsPerQuarter) * this.g.tpq;
	}
	@computed get channelToPixel() {
		return (channel: number) => channel * this.channelWidth;
	}
	@computed get pixelToChannel() {
		return (y: number) => y / this.channelWidth;
	}

	@observable ticksPerNoteSubdivision = 240; // TODO link this up

	@computed get ticksPerNoteSubdivisions() {
		return {
			whole: this.g.tpq * 4,
			quarter: this.g.tpq,
			eighth: this.g.tpq / 2,
			sixteenth: this.g.tpq / 4,
			triplet: (this.g.tpq * 2) / 3,
		};
	}

	@computed get tickDivisions() {
		return range(
			0,
			this.pixelToTick(this.programEditorHeight),
			this.ticksPerNoteSubdivision
		);
	}

	@action zoom(change: number) {
		let newVal = this.pixelsPerQuarter - change;
		if (newVal < 10) newVal = 10;
		this.pixelsPerQuarter = newVal;
	}
	@action scroll(dy: number) {
		let newVal = this.viewingEditorTick + this.pixelToTick(dy);

		const eh = this.pixelToTick(this.programEditorHeight);

		if (newVal >= eh) newVal -= eh;
		if (newVal < 0) newVal += eh;
		this.viewingEditorTick = newVal;
	}
	@action setSubdivision(type: NoteSubdivision) {
		this.ticksPerNoteSubdivision = this.ticksPerNoteSubdivisions[type]; // TODO use action
	}

	constructor(g: GlobalStore) {
		this.g = g;
	}
}
