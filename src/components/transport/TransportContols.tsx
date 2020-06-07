import React from "react";
import { Button } from "react-bootstrap";
import { useStores } from "../../contexts/StoreContext";
import { observer } from "mobx-react";

export const TransportControls = observer(() => {
	const { global } = useStores();
	return (
		<div>
			<Button onClick={global.player.play}>Play</Button>
			<Button onClick={global.player.stop}>Stop</Button>
		</div>
	);
});
