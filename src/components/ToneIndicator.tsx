import { useContext } from "solid-js";
import { AppContext } from "../stores/app";

export const ToneIndicator = () => {
	const app = useContext(AppContext);
	const loaded = app.player.toneLoaded;

	return (
		<div
			style={{
				position: "absolute",
				background: loaded() ? "lime" : "red",
				fontSize: 12,
				padding: 5,
				borderRadius: 8,
				transition: "0.5s",
				userSelect: "none",
			}}
		>
			{loaded() ? "Tone Loaded" : "Tone Not Loaded"}
		</div>
	);
};
