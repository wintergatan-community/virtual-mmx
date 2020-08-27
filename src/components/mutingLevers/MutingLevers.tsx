import { GroupLever } from "./GroupLever";
import { range, entries } from "../../core/helpers/functions";
import { Connector } from "./Connector";
import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { MuteE } from "../../core/eventTimelines/concrete";
import { useContext, For } from "solid-js";
import { AppContext } from "../../stores/app";

export const MutingLevers = () => {
	const app = useContext(AppContext);

	const machine = app.performance.program.state.machine;
	const muted = machine.mute;

	const muteOf = (channelGroup: ChannelGroupTOFIX) => muted[channelGroup];

	const levers = {
		B: muteOf("bass"),
		H: muteOf("hihat"),
		S: muteOf("snare"),
		K: muteOf("bassdrum"),
		C: muteOf("crash"),
		V: muteOf("vibraphone"),
	};
	// setMuted: (muted: boolean) => {
	// 	timelines[channelGroup].triggerEvent(
	// 		new MuteE({ mute: muted, tick: -1 })
	// 	);

	// },
	return (
		<svg
			viewBox={`-150 -50 ${300} ${100}`}
			style={{
				width: "100%",
				height: "100%",
			}}
		>
			<For each={range(0, 5)}>{(offset) => <Connector offset={offset} />}</For>

			<For each={entries(levers)}>
				{([char, muted], offset) => (
					<GroupLever offset={offset()} char={char} muted={muted} />
				)}
			</For>
		</svg>
	);
};
