import { MediaButton } from "./MediaButton";

interface PlayPauseButtonProps {
	togglePlay: () => void;
	running: boolean;
}

export const PlayPauseButton = (props: PlayPauseButtonProps) => (
	<MediaButton
		click={props.togglePlay}
		color={props.running ? "#93c47d" : "#b7b7b7"}
		title="Play/Pause"
	>
		{props.running ? <PauseIcon /> : <PlayIcon />}
	</MediaButton>
);

const PlayIcon = () => (
	<svg viewBox="-50 -50 100 100" style={{ width: "100%", height: "100%" }}>
		<polygon
			points={"20,0 -20,21 -20,-21"}
			strokeWidth={12}
			stroke="#666"
			fill="#666"
			strokeLinejoin="round"
		/>
	</svg>
);

const PauseIcon = () => (
	<svg viewBox="-50 -50 100 100" style={{ width: "100%", height: "100%" }}>
		<rect x={7} y={-25} width={18} height={50} rx={5} fill="#609947" />
		<rect x={-27} y={-25} width={18} height={50} rx={5} fill="#609947" />
	</svg>
);
