import { PlayPauseButton } from "./PlayPauseButton";
import { RestartButton } from "./RestartButton";
import { RecordButton } from "./RecordButton";
import { LoadButton } from "./LoadButton";
import { SaveButton } from "./SaveButton";
import { signal } from "../../core/helpers/solid";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";
import { Program } from "vmmx-schema";
import { exception } from "console";

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

	/**
	 * A function to load a file from a disc and load it into the player.
	 */
	function loadFile() {
		// Generate a dummy file input element
		const fileInput = document.createElement("input");
		fileInput.type = "file";
		fileInput.style.display = "none";
		// Here the file will be loaded
		fileInput.onchange = function (e: Event) {
			if (fileInput.files !== null) {
				const file = fileInput.files[0];
				const reader = new FileReader();
				reader.onload = function (e: Event) {
					try {
						const contents = reader.result as string;
						if (contents !== null) {
							const program = JSON.parse(contents) as Program;
							player.program.loadProgram(program);
							document.body.removeChild(fileInput);
						}
					} catch (message) {
						alert(
							"Failed to load program. Are you sure it is a valid vmmx program?\nMessage: " +
								message
						);
					}
				};
				reader.readAsText(file);
			}
		};
		document.body.appendChild(fileInput);
		// Fake click event to simulate click on button
		const eventMouse = document.createEvent("MouseEvents");
		eventMouse.initMouseEvent(
			"click",
			true,
			false,
			window,
			0,
			0,
			0,
			0,
			0,
			false,
			false,
			false,
			false,
			0,
			null
		);
		fileInput.dispatchEvent(eventMouse);
	}

	function saveFile() {
		alert("Save file");
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
				<RestartButton restart={player.restart} />
				<LoadButton onLoad={loadFile} />
				<SaveButton onSave={saveFile} />
				<RecordButton toggleRecord={toggleRecord} recording={recording()} />
			</div>
		</div>
	);
};
