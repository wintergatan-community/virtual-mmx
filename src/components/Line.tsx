export const Line = (props: { at: number; color: string }) => {
	return (
		<line
			y1={props.at}
			y2={props.at}
			x2={500}
			stroke={props.color}
			strokeWidth={props.color === "red" ? 1 : 2}
		/>
	);
};
