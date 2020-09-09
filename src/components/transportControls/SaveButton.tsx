import { MediaButton } from "./MediaButton";

interface SaveButtonProps {
	onSave: () => void;
}

export const SaveButton = (props: SaveButtonProps) => (
	<MediaButton click={props.onSave} color="#b7b7b7" title="Save a song to disk">
		<SaveIcon />
	</MediaButton>
);

const SaveIcon = () => (
	<svg viewBox="-5 -5 40 40" style={{ width: "100%", height: "100%" }}>
		<path
			style="fill:none;stroke:#666666;stroke-width:2;stroke-linecap:round;"
			d="M 28,9 V 29 H 1 V 1 h 20"
		/>
		<rect
			style="fill:none;stroke:#666666;stroke-width:2.0;"
			width="18"
			height="13"
			x="6"
			y="16"
		/>
		<rect
			y="1"
			x="7"
			height="9"
			width="13.0"
			style="fill:none;stroke:#666666;stroke-width:2;"
		/>
		<path
			style="fill:none;stroke:#666666;stroke-width:2;stroke-linecap:round;"
			d="m 21,1 7,8"
		/>
		<rect y="1" x="15" height="9" width="5" style="fill:#666666;" />
	</svg>
);
