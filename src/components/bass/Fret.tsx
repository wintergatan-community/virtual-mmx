import { useContext, For } from "solid-js";
import { BassContext } from "./Bass";
import { TranslateGroup } from "../Translate";

interface FretProps {
	fret: number;
	markings: number[];
}

export const Fret = (props: FretProps) => {
	const { bass } = useContext(BassContext);

	const y = () => props.fret * bass.fretHeight();
	const midFret = () => -bass.fretHeight / 2;

	return (
		<TranslateGroup y={y}>
			<line
				x1={1}
				x2={bass.viewWidth}
				y1={0}
				y2={0}
				stroke="rgb(239, 239, 239)"
			/>
			<For each={props.markings}>
				{(marking) => (
					<circle
						cx={bass.stringToPixel(marking)}
						cy={midFret()}
						r={5}
						fill="rgb(96, 90, 80)"
					/>
				)}
			</For>
		</TranslateGroup>
	);
};
