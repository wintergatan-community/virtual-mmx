import { NoteSubdivision } from "../core/types";
import { Note } from "vmmx-schema/note_names";
import { GlobalStore } from "./globalStore";
import { observable, computed, action } from "mobx";
import { range } from "../core/helpers";

type SubdivisionChecker = (tick: number) => number;
type SubdivisionCheckerKey = "realistic"; // TODO more

export interface EditorStoreInterface {
	// settable
	pixelsPerQuarter: number;
	viewingEditorTick: number; // tick at top of editor (can be decimal)
	viewingEditorChannel: number; // channel at left of editor (can be decimal)
	showEmpties: boolean;

	// constants
	subdivisionCheckers: { [key in SubdivisionCheckerKey]: SubdivisionChecker };
	channelWidth: number;

	// actionable
	channels: Note[];
	subdivisionChecker: SubdivisionChecker;

	// other
	programEditorWidth: number;
	programEditorHeight: number;

	tickToPixel: (tick: number) => number;
	pixelToTick: (x: number) => number;
	channelToPixel: (channel: number) => number;
	pixelToChannel: (channel: number) => number;

	ticksPerNoteSubdivision: number;
	ticksPerNoteSubdivisions: { [type in NoteSubdivision]: number };
}

export class EditorStore implements EditorStoreInterface {
	g: GlobalStore;

	@observable pixelsPerQuarter = 20;
	@observable viewingEditorTick = 0;
	@observable viewingEditorChannel = 0;
	@observable showEmpties = false;

	// constants
	@observable subdivisionCheckers = {
		realistic: function (this: any, tick: number) {
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
	@observable channelWidth = 45;

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
	programEditorHeight = 1500;

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
			quarter: this.g.tpq,
			eighth: this.g.tpq / 2,
			sixteenth: this.g.tpq / 4,
			triplet: (this.g.tpq * 2) / 3,
		};
	}

	@computed get tickDivisions() {
		return range(
			0,
			this.pixelToTick(this.programEditorWidth),
			this.ticksPerNoteSubdivision
		);
	}

	@action zoom(change: number) {
		let newVal = this.pixelsPerQuarter - change;
		if (newVal < 10) newVal = 10;
		this.pixelsPerQuarter = newVal;
	}
	@action scroll(dy: number) {
		let newVal = this.viewingEditorTick + dy;
		if (newVal < 0) newVal = 0;
		if (newVal > this.programEditorHeight) newVal = -this.programEditorHeight;
		this.viewingEditorTick = newVal;
	}
	@action setSubdivision(type: NoteSubdivision) {
		this.ticksPerNoteSubdivision = this.ticksPerNoteSubdivisions[type]; // TODO use action
	}

	constructor(g: GlobalStore) {
		this.g = g;
	}
}
