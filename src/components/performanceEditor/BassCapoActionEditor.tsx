import React from "react";
import { computed } from "mobx";
import { range } from "../../core/helpers/functions";
import { AppComponent } from "../storeComponents";
import { EventPolylineContainer } from "./EventPolylineContainer";
import { ValueTimeline } from "./ValueTimeline";
import { CapoE } from "../../core/eventTimelines/concrete";

class BassCapoActionEditor_ extends AppComponent {
	@computed get capoTimeline() {
		return this.app.performance.eventTimelines.bass.capo[1];
	}

	@computed get axisValues() {
		return range(0, 20.1, 5);
	}

	render() {
		return (
			<ValueTimeline labels={this.axisValues}>
				{(valToPixel) => (
					<EventPolylineContainer
						timeline={this.capoTimeline}
						shouldShow={() => true}
						colorOf={() => "#ff0000"}
						value={(e) => e.moveFret}
						valToPixel={valToPixel}
						newEventAt={(tick, moveFret) => new CapoE({ moveFret, tick })}
					/>
				)}
			</ValueTimeline>
		);
	}
}

export const BassCapoActionEditor = AppComponent.sync(BassCapoActionEditor_);
