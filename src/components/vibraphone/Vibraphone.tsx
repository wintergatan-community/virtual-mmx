import { VibraphoneBar } from "./VibraphoneBar";
import { createContext, useContext, For } from "solid-js";
import { VibraphoneDisplayStore } from "./vibraphoneDisplay";
import { AppContext } from "../../stores/app";
import { values } from "../../core/helpers/functions";
import { TranslateGroup } from "../Translate";

export const VibraphoneContext = createContext<{
	vibra: VibraphoneDisplayStore;
}>();

export const Vibraphone = () => {
	const app = useContext(AppContext);
	const vibra = new VibraphoneDisplayStore();
	const barStores = values(app.performance.program.state.vibraphone.barStores);

	return (
		<VibraphoneContext.Provider value={{ vibra }}>
			<svg
				viewBox={`0 0 ${vibra.wholeWidth} ${vibra.height}`}
				id="vibraphone"
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<TranslateGroup y={() => vibra.height / 2}>
					<For each={barStores}>
						{(barStore) => <VibraphoneBar barStore={barStore} />}
					</For>
				</TranslateGroup>
			</svg>
		</VibraphoneContext.Provider>
	);
};
