import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function TransportControls() {
	const { player } = useContext(GlobalContext);

	const play = () => player.play();
	const stop = () => player.stop();

	return (
		<div>
			<Button onClick={play}>Play</Button>
			<Button onClick={stop}>Stop</Button>
		</div>
	);
}
