import React, { createContext } from "react";
import { Program } from "vmmx-schema";
import { SomeReactChildren } from "../core/types";

interface GlobalContext {
	program: Program;
}

export const GlobalContext = createContext({} as GlobalContext);

export default function GlobalContextProvider(props: {
	children: SomeReactChildren;
}) {
	const program: Program = {
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

	return (
		<GlobalContext.Provider value={{ program }}>
			{props.children}
		</GlobalContext.Provider>
	);
}
