import { DropE } from "../../core/eventTimelines/concrete";
import { useContext, Show } from "solid-js";
import { ProgrammingWheelContext } from "./ProgrammingWheel";
import { TranslateOnScroll } from "../Scroll";

export const PegPlacer = () => {
	const { wheel, scroll, mouse } = useContext(ProgrammingWheelContext);

	const mouseSnapped = () => {
		const m = mouse.mousePos();
		if (!m) return;
		const div = wheel.ticksPerNoteSubdivision();
		const modded = m.y % wheel.totalTicks();
		const mouseTick = Math.floor(modded / div) * div;
		const mouseChannel = Math.floor(m.x);
		return { mouseTick, mouseChannel };
	};

	const timeline = () => {
		const channelNumber = mouseSnapped()?.mouseChannel;
		if (channelNumber === undefined || channelNumber === Infinity) return null;
		return wheel.instrumentChannels()[channelNumber].timeline;
	};
	const alreadyPlaced = () => {
		const t = timeline();
		const mouseTick = mouseSnapped()?.mouseTick;
		if (!mouseTick || !t) return true;
		return t.events().some((e) => e.tick() === mouseTick);
	};

	function addPeg() {
		const t = timeline();
		const mouseTick = mouseSnapped()?.mouseTick;
		if (!mouseTick || !t) return;
		const difs = t.getAddDifs(new DropE({ tick: mouseTick }));
		if (!difs) return;
		t.applyDifs(difs);
	}
	function height() {
		return scroll.y.toPixel(wheel.ticksPerNoteSubdivision());
	}

	return (
		<Show when={mouseSnapped() && !alreadyPlaced()}>
			<TranslateOnScroll
				scroll={scroll}
				axis="x"
				by={() => mouseSnapped()?.mouseChannel ?? -1}
			>
				<TranslateOnScroll
					scroll={scroll}
					axis="y"
					by={() => mouseSnapped()?.mouseTick ?? -1}
				>
					<rect
						onMouseDown={addPeg}
						onMouseMove={(e) => e.buttons === 1 && addPeg()}
						style={{cursor: 'pointer'}}
						width={scroll.x.toPixel(1)}
						height={height()}
						fill="#0004"
					/>
				</TranslateOnScroll>
			</TranslateOnScroll>
		</Show>
	);
};
