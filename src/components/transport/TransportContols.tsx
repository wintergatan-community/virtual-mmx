import React from "react";
import Button from "react-bootstrap/Button";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";

export const TransportControls = observer(() => {
	const { global } = useStores();
	const store = useLocalStore(() => ({
		onClick() {
			if (global.player.running) {
				global.player.pause();
			} else {
				global.player.play();
			}
		},
	}));

	return (
		<div>
			<Button onClick={store.onClick}>
				{global.player.running ? "Pause" : "Play"}
			</Button>
			<Button onClick={global.player.restart}>Restart</Button>
		</div>
	);
});
