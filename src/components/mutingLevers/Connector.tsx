import { mapValue } from "../../core/helpers/functions";

interface ConnectorProps {
	offset: number;
}

export const Connector = (props: ConnectorProps) => {
	const x = () => offsetToPixel(props.offset);
	const width = () => offsetToPixel(1) - offsetToPixel(0);
	const height = () => 30 / (props.offset + 3);

	return (
		<rect
			x={x()}
			y={-height() / 2}
			width={width()}
			height={height()}
			fill="rgb(159, 159, 159)"
		/>
	);
};

export function offsetToPixel(offset: number) {
	// TODO move to local provider
	const pad = 10;
	return mapValue(offset, 0, 5, pad, 200 - pad) - 100;
}
