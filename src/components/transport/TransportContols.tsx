import React from "react";
import { Button } from "react-bootstrap";
import { useStores } from "../../contexts/StoreContext";
import { useLocalStore, observer } from "mobx-react";

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

export default TransportControls;
