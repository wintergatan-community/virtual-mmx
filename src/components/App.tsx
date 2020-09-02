import { TransportControls } from "./transportControls/TransportControls";
import { Vibraphone } from "./vibraphone/Vibraphone";
import { Drums } from "./drums/Drums";
import { HiHatMachine } from "./hiHatMachine/HiHatMachine";
import { Bass } from "./bass/Bass";
import { AppStore, AppContext } from "../stores/app";
import { ProgrammingWheel } from "./programmingWheel/ProgrammingWheel";
import { Crank } from "./crank/Crank";
import { MutingLevers } from "./mutingLevers/MutingLevers";
// import { PerformanceEditor } from "./performanceEditor/PerformanceEditor";
import { VmmxHeader } from "./VmmxHeader/VmmxHeader";
import { PerformanceEditor } from "./performanceEditor/PerformanceEditor";

export const App = () => {
	const app = new AppStore();
	const headerPercent = 6;
	app.setupTesting();

	return (
		<AppContext.Provider value={app}>
			<div style={{ position: "absolute", width: "100%", height: "100%" }}>
				<VmmxHeader headerPercent={headerPercent} />

				<div
					style={{
						display: "grid",
						"grid-template-columns": "33% 14% 14% 15% 24%",
						"grid-template-rows": "18% 28% 23% 31%",
						height: 100 - headerPercent + "%",
						"background-color": "#f3f3f3ff",
					}}
				>
					<GridLayout col="1/4" row="1/4">
						<ProgrammingWheel />
					</GridLayout>
					<GridLayout col="1/2" row="4/5">
						<Vibraphone />
					</GridLayout>
					<GridLayout col="2/3" row="4/5">
						<Drums />
					</GridLayout>
					<GridLayout col="3/4" row="4/5">
						<HiHatMachine />
					</GridLayout>
					<GridLayout col="4/5" row="1/5">
						<Bass />
					</GridLayout>
					<GridLayout col="5/6" row="1/2">
						<MutingLevers />
					</GridLayout>
					<GridLayout col="5/6" row="2/3">
						<Crank />
					</GridLayout>
					<GridLayout col="5/6" row="3/4">
						<></>
					</GridLayout>
					<GridLayout col="5/6" row="4/5">
						<TransportControls />
					</GridLayout>
				</div>
				<PerformanceEditor />
			</div>
		</AppContext.Provider>
	);
};

interface GridLayoutProps {
	col: string;
	row: string;
	children?: JSX.Element;
}

const GridLayout = (props: GridLayoutProps) => (
	<div
		style={{
			border: "#cccccc 1px solid",
			"grid-column": props.col,
			"grid-row": props.row,
		}}
	>
		{props.children}
	</div>
);
