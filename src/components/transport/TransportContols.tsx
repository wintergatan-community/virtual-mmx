import React from "react";
import { Button } from "react-bootstrap";
import { Program, VibraphoneChannel } from "vmmx-schema";
import { VmmxPlayer } from "../../core/playback/player";

let program: Program = {
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

class TransportControls extends React.Component {
	player: VmmxPlayer | undefined;

	componentDidMount() {
		// add some note events
		for (let i = 1; i <= 11; i++) {
			program.dropEvents.push({
				kind: "vibraphone",
				channel: i as VibraphoneChannel,
				tick: (i - 1) * (program.metadata.tpq / 2),
			});
		}
		this.player = new VmmxPlayer(program);
	}

	play = () => this?.player?.play();
	stop = () => this?.player?.stop();

	render() {
		return (
			<div>
				<Button onClick={this.play}>Play</Button>
				<Button onClick={this.stop}>Stop</Button>
			</div>
		);
	}
}

export default TransportControls;
