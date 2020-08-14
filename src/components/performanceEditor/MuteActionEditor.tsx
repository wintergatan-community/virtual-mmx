import React from "react";
import { AppComponent } from "../storeComponents";
import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { computed } from "mobx";
import { EventPolylineContainer } from "./EventPolylineContainer";
import { keys } from "../../core/helpers/functions";
import { StackedTimeline } from "./StackedTimelines";
import { MuteE } from "../../core/eventTimelines/concrete";

class MuteActionEditor_ extends AppComponent {
	@computed get timelines() {
		return this.app.performance.eventTimelines.machine.channelMute;
	}

	colors: Record<ChannelGroupTOFIX, string> = {
		bass: "#85200c",
		vibraphone: "#1155cc",
		bassdrum: "#bf9000",
		hihat: "#ff3300",
		snare: "#9900ff",
		crash: "#00ff00",
	};

	render() {
		return (
			<StackedTimeline labels={keys(this.timelines)}>
				{(label) => (
					<EventPolylineContainer
						timeline={this.timelines[label]}
						shouldShow={(c) => c.start.mute}
						colorOf={() => this.colors[label]}
						value={() => 1}
						valToPixel={() => 0}
						newEventAt={(tick) => new MuteE({ mute: true, tick })}
					/>
				)}
			</StackedTimeline>
		);
	}
}

export const MuteActionEditor = AppComponent.sync(MuteActionEditor_);
