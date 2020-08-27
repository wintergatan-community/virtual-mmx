import { PlayPauseButton } from "./PlayPauseButton";
import { RestartButton } from "./RestartButton";
import { RecordButton } from "./RecordButton";
import { signal } from "../../core/helpers/solid";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const TransportControls = () => {
	const app = useContext(AppContext);
	const recording = signal(false);
	const player = app.player;

	function togglePlay() {
		if (player.running()) {
			player.pause();
		} else {
			player.play();
		}
	}
	function toggleRecord() {
		recording(!recording());
	}

	return (
		<div
			style={{
				"background-color": "rgb(225, 225, 225)",
				// border: "1px solid rgb(195, 195, 195)",
				"border-radius": "10px",
				width: "92%",
				height: "92%",
				padding: "10px",
			}}
		>
			<div
				style={{
					display: "flex",
					"background-color": "#ccccccff",
					"border-radius": "8px",
					padding: "5px",
				}}
			>
				<PlayPauseButton togglePlay={togglePlay} running={player.running()} />
				<RecordButton toggleRecord={toggleRecord} recording={recording()} />
				<RestartButton restart={player.restart} />
			</div>
		</div>
	);
};
