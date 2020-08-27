import { GroupLever } from "./GroupLever";
import { range, entries } from "../../core/helpers/functions";
import { Connector } from "./Connector";
import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { useContext, For } from "solid-js";
import { AppContext } from "../../stores/app";

export const MutingLevers = () => {
	const app = useContext(AppContext);

	const mute = app.performance.program.state.machine.mute;
	const channelMute = app.performance.eventTimelines.machine.channelMute;

	const muteOf = (channelGroup: ChannelGroupTOFIX) => ({
		timeline: channelMute[channelGroup],
		current: () => mute[channelGroup]() ?? false,
	});

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
				{([char, { timeline, current }], offset) => (
					<GroupLever
						offset={offset()}
						char={char}
						current={current}
						timeline={timeline}
					/>
				)}
			</For>
		</svg>
	);
};
