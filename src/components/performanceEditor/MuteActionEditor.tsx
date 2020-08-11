import React from "react";
import { AppComponent } from "../storeComponents";
import { ChannelGroupTOFIX } from "../../toFutureSchema";
import { computed } from "mobx";
import { LabelAxis } from "./LabelAxis";
import { EventPolylineContainer } from "./EventPolylineContainer";
import { keys } from "../../core/helpers/functions";

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
			<LabelAxis labels={keys(this.timelines)}>
				{(label) => (
					<EventPolylineContainer
						timeline={this.timelines[label]}
						color={this.colors[label as ChannelGroupTOFIX]}
						shouldShow={(c) => c.start.mute}
						colorOf={() => "blue"}
					/>
				)}
			</LabelAxis>
		);
	}
}

export const MuteActionEditor = AppComponent.sync(MuteActionEditor_);
