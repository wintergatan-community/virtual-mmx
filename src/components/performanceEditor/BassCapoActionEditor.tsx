import { range } from "../../core/helpers/functions";
import { EventPolylineContainer } from "./EventPolylineContainer";
import { ValueTimeline } from "./ValueTimeline";
import { CapoE } from "../../core/eventTimelines/concrete";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const BassCapoActionEditor = () => {
	const app = useContext(AppContext);

	const capoTimeline = app.performance.eventTimelines.bass.capo[1];
	const axisValues = range(0, 20.1, 5);

	return (
		<ValueTimeline labels={axisValues}>
			{(valToPixel) => (
				<EventPolylineContainer
					timeline={capoTimeline}
					shouldShow={() => true}
					colorOf={() => "#ff0000"}
					value={(e) => e.moveFret}
					valToPixel={valToPixel}
					newEventAt={(tick, moveFret) => new CapoE({ moveFret, tick })}
				/>
			)}
		</ValueTimeline>
	);
};
