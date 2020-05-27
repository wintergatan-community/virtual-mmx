import React, { createContext, useState, useCallback } from "react";
import { NoteSubdivision, MarbleEvent } from "../core/types";

// this needs a serious rethink. Probably using useReducer
// currently, any more of less "global" state is being provided by this context
// it's clunky for now

type SubdivisionChecker = (tick: number) => number;
type SubdivisionCheckerKey = "realistic"; // TODO more

interface EditorContext {
	width: number;
	height: number;
	channels: string[];
	textColor: string;
	spacing: number;
	setSpacing: (newSpacing: number) => void;
	tpq: number;
	tickToPixel: (tick: number) => number;
	pixelToTick: (x: number) => number;
	channelToPixel: (channel: number) => number;
	pixelToChannel: (channel: number) => number;
	noteSubdivision: number;
	setNoteSubdivision: (newNoteSubdivision: number) => void;
	noteSubdivisions: { [type in NoteSubdivision]: number };
	marbleEvents: MarbleEvent[];
	setMarbleEvents: (newMarbleEvents: MarbleEvent[]) => void;
	showEmpties: boolean;
	setShowEmpties: (newShowEmpties: boolean) => void;
	subdivisionChecker: SubdivisionChecker;
	setSubdivisionChecker: (type: SubdivisionCheckerKey) => void;
	viewingEditorTick: number;
	setViewingEditorTick: (newViewingEditorTick: number) => void;
	viewingEditorChannel: number;
	setViewingEditorChannel: (newViewingEditorChannel: number) => void;
}

export const EditorContext = createContext({} as EditorContext);

export default function EditorContextProvider(props: { children: any }) {
	const channels = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#"];
	const channelWidth = 45;
	const width = channels.length * channelWidth;
	const height = 1500;
	const textColor = "gray";
	const [spacing, setSpacing] = useState(20); // pixels per quarter notes
	const tpq = 12; // ticks per quarter note
	const noteSubdivisions: { [type in NoteSubdivision]: number } = {
		quarter: tpq,
		eighth: tpq / 2,
		sixteenth: tpq / 4,
		triplet: (tpq * 2) / 3,
	};
	const [noteSubdivision, setNoteSubdivision] = useState(
		noteSubdivisions.quarter
	);
	const [showEmpties, setShowEmpties] = useState(true);

	const [marbleEvents, setMarbleEvents] = useState<MarbleEvent[]>([
		{ tick: 0, channel: 1 },
		{ tick: 12, channel: 2 },
		{ tick: 36, channel: 3 },
	]); // here for testing

	function tickToPixel(tick: number) {
		return (tick * spacing) / tpq;
	}
	function pixelToTick(x: number) {
		return (x / spacing) * tpq;
	}
	function channelToPixel(channel: number) {
		return channel * channelWidth;
	}
	function pixelToChannel(y: number) {
		return y / channelWidth;
	}

	const subdivisionCheckers: {
		[key in SubdivisionCheckerKey]: SubdivisionChecker;
	} = {
		realistic(tick: number) {
			if (tick % noteSubdivisions.eighth === 0) {
				return 0.5;
			} else if (tick % noteSubdivisions.sixteenth === 0) {
				return 0.1;
			} else if (tick % noteSubdivisions.triplet === 0) {
				return 0.9;
			}
			return 0;
		},
	};

	const [s, setSubdivisionChecker] = useState<SubdivisionCheckerKey>(
		"realistic"
	);
	const subdivisionChecker = useCallback(subdivisionCheckers[s], [
		noteSubdivision,
	]);

	const [viewingEditorTick, setViewingEditorTick] = useState(0);
	const [viewingEditorChannel, setViewingEditorChannel] = useState(0);

	return (
		<EditorContext.Provider
			value={{
				width,
				height,
				channels,
				textColor,
				spacing,
				setSpacing,
				tpq,
				tickToPixel,
				pixelToTick,
				channelToPixel,
				pixelToChannel,
				noteSubdivision,
				noteSubdivisions,
				setNoteSubdivision,
				marbleEvents,
				setMarbleEvents,
				showEmpties,
				setShowEmpties,
				setSubdivisionChecker,
				subdivisionChecker,
				viewingEditorTick,
				setViewingEditorTick,
				viewingEditorChannel,
				setViewingEditorChannel,
			}}
		>
			{props.children}
		</EditorContext.Provider>
	);
}
