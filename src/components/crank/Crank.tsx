import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const Crank = () => {
	const app = useContext(AppContext);

	// height of crank in its rotation
	const y = () => {
		const tick = app.player.currentTick();
		const tpq = app.performance.program.metadata.tpq;
		const rot = (tick / tpq) * 2 * Math.PI;

		return 10 * Math.sin(rot);
	};

	return (
		<svg
			viewBox="-50 -50 100 100"
			style={{
				width: "100%",
				height: "100%",
			}}
		>
			<rect x={-26} y={-35} width={6} height={70} fill="rgb(83, 83, 83)" />
			<rect x={-39} y={-18} width={6} height={36} fill="rgb(83, 83, 83)" />

			<g transform={`translate(0, ${y()})`}>
				<rect x={-33} y={-3} width={25} height={6} fill="rgb(159, 159, 159)" />
				<rect
					x={-10}
					y={-14}
					width={44}
					height={28}
					fill="rgb(184, 171, 156)"
				/>
			</g>

			<g transform="translate(15, 35)">
				<rect
					x={-30}
					y={-10}
					width={60}
					height={20}
					rx={10}
					fill="rgb(237, 237, 237)"
				/>
				<text
					y={4}
					fontSize={11}
					textAnchor="middle"
					style={{ "user-select": "none" }}
				>
					{app.performance.program.state.machine.bpm} BPM
				</text>
			</g>
		</svg>
	);
};
