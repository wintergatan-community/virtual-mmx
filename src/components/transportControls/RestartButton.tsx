import { MediaButton } from "./MediaButton";

interface RestartButtonProps {
	restart: () => void;
}

export const RestartButton = (props: RestartButtonProps) => (
	<MediaButton click={props.restart} color="#b7b7b7">
		<RestartIcon />
	</MediaButton>
);

const RestartIcon = () => {
	const Arrow = (props: { x: number }) => {
		return (
			<g transform={`translate(${props.x}, 0)`}>
				<polygon
					points={"-8,0 8,18 8,-18"}
					strokeWidth={12}
					stroke="#666"
					fill="#666"
					strokeLinejoin="round"
				/>
			</g>
		);
	};
	return (
		<svg viewBox="-50 -50 100 100" style={{ width: "100%", height: "100%" }}>
			<Arrow x={-18} />
			<Arrow x={18} />
		</svg>
	);
};
