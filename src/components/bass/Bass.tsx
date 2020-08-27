import { range, values } from "../../core/helpers/functions";
import { Fret } from "./Fret";
import { String } from "./String";
import { BassDisplayStore } from "./bassDisplay";
import { FretFinger } from "./FretFinger";
import { MouseTracker } from "../../core/helpers/MouseTracker";
import { createContext, useContext, For } from "solid-js";
import { AppContext } from "../../stores/app";
import { BassString } from "vmmx-schema";

export const BassContext = createContext<{
	bass: BassDisplayStore;
	mouse: MouseTracker;
}>();

export const Bass = () => {
	const app = useContext(AppContext);

	const bass = new BassDisplayStore();
	const mouse = new MouseTracker();
	const stringStores = values(app.performance.program.state.bass.stringStores);

	/** Circle markings for each fret on bass neck */
	const fretDatas = range(1, bass.totalFrets + 1).map((n) => {
		let markings: number[] = [];
		if (n === 12) markings = [1.5, 3.5];
		else if (n % 2 === 1 && ![11, 13, 1].includes(n)) markings = [2.5];
		return {
			fret: n,
			markings,
		};
	});

	// currently hovered bass string or undefined
	const hoveredString = () => {
		const m = mouse.mousePos();
		if (!m) return;
		const percentX = m.x / bass.viewWidth;
		const hoveredStringNumber = Math.ceil(percentX * 4) as BassString;
		return app.performance.program.state.bass.stringStores[hoveredStringNumber];
	};

	// handle mouse wheel scrolling
	function handleWheel(e: WheelEvent) {
		const h = hoveredString();
		if (!h) return;
		h.moveCapo(h.capo + (e.deltaY > 0 ? 1 : -1));
	}

	let fretBoardRef!: SVGSVGElement;
	const jsx = (
		<BassContext.Provider value={{ bass, mouse }}>
			<svg
				viewBox={`0 0 ${bass.viewWidth} ${bass.viewHeight}`}
				style={{
					width: bass.viewWidth + "px",
					height: bass.viewHeight + "px",
				}}
				ref={fretBoardRef}
				onWheel={handleWheel}
			>
				<rect
					rx={20}
					ry={6}
					width={bass.viewWidth}
					height={bass.viewHeight}
					fill="rgb(241, 221, 189, 1)"
				/>
				<For each={fretDatas}>
					{(fretData) => (
						<Fret fret={fretData.fret} markings={fretData.markings} />
					)}
				</For>
				<For each={stringStores}>
					{(stringStore) => <String stringStore={stringStore} />}
				</For>
				<FretFinger />
			</svg>
		</BassContext.Provider>
	);
	mouse.setElement(fretBoardRef);
	return jsx;
};
