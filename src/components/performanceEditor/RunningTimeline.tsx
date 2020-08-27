interface RunningTimelineProps {
	label: string | number;
	y: number;
	children?: JSX.Element;
}

export const RunningTimeline = (props: RunningTimelineProps) => (
	<g transform={`translate(0, ${props.y})`}>
		<line x2={2000} stroke="#b7b7b7" />
		{props.children}
		<rect width={90} height={18} y={-9} x={-4} fill="#b7b7b7" rx={9} />
		<text x={10} fontSize={11} y={4} fill="#434343">
			{props.label}
		</text>
	</g>
);
