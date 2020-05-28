import React, { createContext, useEffect, useState, useRef } from "react";
import { Program } from "vmmx-schema";
import { SomeReactChildren } from "../core/types";
import { VmmxPlayer } from "../core/playback/player";
import { ToneDropEvent } from "../core/playback/events";

interface GlobalContext {
	program: Program;
	setProgram: React.Dispatch<React.SetStateAction<Program>>;
	player: VmmxPlayer;
	dropEvents: ToneDropEvent[];
	setDropEvents: React.Dispatch<React.SetStateAction<ToneDropEvent[]>>;
	tpq: number;
}

export const GlobalContext = createContext({} as GlobalContext);

export default function GlobalContextProvider(props: {
	children: SomeReactChildren;
}) {
	const [init, setInit] = useState(false);
	const [program, setProgram] = useState<Program>({
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
		dropEvents: [],
	});
	const player = useRef(new VmmxPlayer(program));

	// TODO needs to be tied to program.dropEvents
	const [dropEvents, setDropEvents] = useState<ToneDropEvent[]>([]);
	const tpq = program.metadata.tpq;

	useEffect(() => {
		if (init) return;

		// const dropEventsEXAMPLE: TickedDropEvent[] = range(1, 11, 1).map((i) => ({
		// 	kind: "vibraphone",
		// 	channel: i as VibraphoneChannel,
		// 	tick: (i - 1) * (program.metadata.tpq / 2),
		// }));

		// setProgram((prevProgram) => {
		// 	return {
		// 		...prevProgram,
		// 		dropEvents: dropEventsEXAMPLE,
		// 	};
		// });

		// player.current.loadDropEvents(dropEventsEXAMPLE);

		setInit(true);
	}, [program, init]);

	return (
		<GlobalContext.Provider
			value={{
				program,
				setProgram,
				player: player.current,
				dropEvents,
				setDropEvents,
				tpq,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
}
