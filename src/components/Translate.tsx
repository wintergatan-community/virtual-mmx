import { Signal } from "../core/helpers/solid";

interface TranslateGroupProps {
	x?: Signal<number>;
	y?: Signal<number>;
	children: JSX.Element;
}

export const TranslateGroup = (props: TranslateGroupProps) => (
	<g
		transform={`translate(
            ${props.x ? props.x() : 0},
            ${props.y ? props.y() : 0})`}
	>
		{props.children}
	</g>
);
