import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { EventPolylineContainer } from "./EventPolylineContainer";
import { keys } from "../../core/helpers/functions";
import { StackedTimeline } from "./StackedTimelines";
import { MuteE } from "../../core/eventTimelines/concrete";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const MuteActionEditor = () => {
	const app = useContext(AppContext);

	const timelines = app.performance.eventTimelines.machine.channelMute;
	const colors: Record<ChannelGroupTOFIX, string> = {
		bass: "#85200c",
		vibraphone: "#1155cc",
		bassdrum: "#bf9000",
		hihat: "#ff3300",
		snare: "#9900ff",
		crash: "#00ff00",
	};

	return (
		<StackedTimeline labels={keys(timelines)}>
			{(label) => (
				<EventPolylineContainer
					timeline={timelines[label]}
					shouldShow={(c) => c.start.mute}
					colorOf={() => colors[label]}
					value={() => 1}
					valToPixel={() => 0}
					newEventAt={(tick) => new MuteE({ mute: true, tick })}
				/>
			)}
		</StackedTimeline>
	);
};
