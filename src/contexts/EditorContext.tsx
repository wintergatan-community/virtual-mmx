import React, { createContext, useState, useCallback, useContext } from "react";
import { NoteSubdivision, SomeReactChildren } from "../core/types";
import { GlobalContext } from "./GlobalContext";

import { Note } from "vmmx-schema/note_names";
import { ToneDropEvent } from "../core/playback/events";

// this needs a serious rethink. Probably using useReducer
// currently, any more of less "global" state is being provided by this context
// it's clunky for now

type SubdivisionChecker = (tick: number) => number;
type SubdivisionCheckerKey = "realistic"; // TODO more

interface EditorContext {
	width: number;
	height: number;
	textColor: string;
	channels: Note[];
	spacing: number;
	setSpacing: (newSpacing: number) => void;
	tickToPixel: (tick: number) => number;
	pixelToTick: (x: number) => number;
	channelToPixel: (channel: number) => number;
	pixelToChannel: (channel: number) => number;
	noteSubdivision: number;
	setNoteSubdivision: (newNoteSubdivision: number) => void;
	noteSubdivisions: { [type in NoteSubdivision]: number };
	dropEvents: ToneDropEvent[];
	setDropEvents: (newTickedDropEvents: ToneDropEvent[]) => void;
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

export default function EditorContextProvider(props: {
	children: SomeReactChildren;
}) {
	const { program, tpq, dropEvents, setDropEvents } = useContext(GlobalContext);
	const channels = Object.values(program.state.vibraphone.notes); // TODO account for drums and bass

	const channelWidth = 45;
	const width = channels.length * channelWidth;
	const height = 1500;
	const textColor = "gray";
	const [spacing, setSpacing] = useState(20); // pixels per quarter notes

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
				tickToPixel,
				pixelToTick,
				channelToPixel,
				pixelToChannel,
				noteSubdivision,
				noteSubdivisions,
				setNoteSubdivision,
				dropEvents,
				setDropEvents,
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
