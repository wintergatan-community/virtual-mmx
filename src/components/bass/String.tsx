import { BassStringStore } from "../../stores/bass";
import { SpringPulse } from "../../core/helpers/springPulse";
import { bassStrings } from "../../toFutureSchema";
import { useContext } from "solid-js";
import { BassContext } from "./Bass";
import { AppContext } from "../../stores/app";
import { TranslateGroup } from "../Translate";

interface StringProps {
	stringStore: BassStringStore;
}

export const String = (props: StringProps) => {
	const app = useContext(AppContext);
	const { bass } = useContext(BassContext);

	const vibrate = new SpringPulse();

	const x = () => bass.stringToPixel(props.stringStore.string);
	const width = () => bass.viewWidth / bassStrings.length - 2;
	const bassStringTimelines = () =>
		app.jointTimelines.bass[props.stringStore.string];

	function handleScroll(/*e: React.WheelEvent<SVGRectElement>*/) {
		// bass.strings[props.string].capoPos += e.deltaY / 20;
	}

	function strum(e: MouseEvent) {
		if (e.buttons === 1) {
			bassStringTimelines().performance.triggerEvent();
			vibrate.applyCollision(1);
		}
	}

	return (
		<TranslateGroup x={x}>
			<line
				// string
				y2={bass.viewHeight}
				stroke={`rgb(${vibrate.value * 50}, ${vibrate.value * 50}, ${
					vibrate.value * 50
				})`}
				strokeWidth={1.5}
			/>
			<line
				// strum hit box
				y2={bass.viewHeight}
				stroke="#0000"
				strokeWidth={6}
				onMouseEnter={strum}
			/>
			{/* <Capo stringStore={props.stringStore} /> */}
		</TranslateGroup>
	);
};
