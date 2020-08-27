import { MediaButton } from "./MediaButton";

interface RecordButtonProps {
	toggleRecord: () => void;
	recording: boolean;
}

export const RecordButton = (props: RecordButtonProps) => (
	<MediaButton
		click={props.toggleRecord}
		color={props.recording ? "#cc0000" : "#b7b7b7"}
	>
		<RecordIcon color={props.recording ? "#990000" : "#cc0000"} />
	</MediaButton>
);

const RecordIcon = (props: { color: string }) => (
	<svg viewBox="-50 -50 100 100" style={{ width: "100%", height: "100%" }}>
		<circle r={25} fill={props.color} />
	</svg>
);
