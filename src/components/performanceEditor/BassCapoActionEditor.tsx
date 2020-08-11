import React from "react";
import { computed } from "mobx";
import { range, mapValue } from "../../core/helpers/functions";
import { AppComponent } from "../storeComponents";
import { LabelAxis } from "./LabelAxis";
import { EventPolylineContainer } from "./EventPolylineContainer";
import { CapoE } from "../../core/eventTimelines/concrete";

class BassCapoActionEditor_ extends AppComponent {
	@computed get capoTimeline() {
		return this.app.performance.eventTimelines.bass.capo[1];
	}

	@computed get axisValues() {
		return range(0, 20.1, 5).reverse();
	}

	scale = (value: number) => {
		return mapValue(value, 0, 20, 20, 150 - 20) - 20;
	};

	render() {
		// TODO garbage casting
		return (
			<LabelAxis labels={this.axisValues}>
				<EventPolylineContainer
					timeline={this.capoTimeline}
					color={"#ff0000"}
					shouldShow={() => true}
					colorOf={() => "#ff0000"}
					valueOf={
						((e: CapoE) => e.moveFret) as (() => Record<string, string>) &
							((event: CapoE) => number)
					}
					scale={this.scale}
				/>
			</LabelAxis>
		);
	}
}

export const BassCapoActionEditor = AppComponent.sync(BassCapoActionEditor_);
