import React from "react";
import { Button } from "react-bootstrap";
import { Program, VibraphoneChannel, BassString } from "vmmx-schema";
import { VmmxPlayer } from "../../core/playback/player";
import { useStores } from "../../contexts/StoreContext";
import { useLocalStore, observer } from "mobx-react";

// export const TransportControls = observer(() => {
// 	const { global } = useStores();

// 	const play = () => global.player.play();
// 	const stop = () => global.player.stop();

// componentDidMount() {
// 	// add some note events
// 	for (let i = 1; i <= 11; i++) {
// 		program.dropEvents.push({
// 			kind: "vibraphone",
// 			channel: i as VibraphoneChannel,
// 			tick: (i - 1) * (program.metadata.tpq / 2),
// 		});
// 	}
// 	for (let i = 1; i <= 4; i++) {
// 		program.dropEvents.push({
// 			kind: "bass",
// 			string: i as BassString,
// 			fret: 0,
// 			tick: (i - 1 + 11) * (program.metadata.tpq / 2),
// 		});
// 	}
// 	this.player = new VmmxPlayer(program);
// }

export const TransportControls = observer(() => {
	const { global } = useStores();
	const store = useLocalStore(() => ({
		play() {
			global.player.play();
		},
		stop() {
			global.player.stop();
		},
	}));
	return (
		<div>
			<Button onClick={store.play}>Play</Button>
			<Button onClick={store.stop}>Stop</Button>
		</div>
	);
});
