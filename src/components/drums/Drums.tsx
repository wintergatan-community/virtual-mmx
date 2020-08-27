import { Snare } from "./Snare";
import { HiHat } from "./HiHat";
import { Crash } from "./Crash";
import { DrumsDisplayStore } from "./drumsDisplay";
import { createContext } from "solid-js";
import { Bassdrum } from "./Bassdrum";

export const DrumsContext = createContext<{ drums: DrumsDisplayStore }>();

export const Drums = () => {
	const drums = new DrumsDisplayStore();

	return (
		<DrumsContext.Provider value={{ drums }}>
			<svg
				viewBox="0 0 100 100"
				style={{
					width: "100%",
					height: "100%",
				}}
			>
				<Snare />
				<Bassdrum />
				<HiHat />
				<Crash />
			</svg>
		</DrumsContext.Provider>
	);
};
