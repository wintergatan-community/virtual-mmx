import React from "react";
import { AppComponent } from "../storeComponents";
import { GroupLever } from "./GroupLever";
import { range } from "../../core/helpers/functions";
import { Connector } from "./Connector";
import { computed } from "mobx";
import { ChannelGroupTOFIX } from "../../toFutureSchema";

class MutingLevers_ extends AppComponent {
	width = 160;
	height = 160;

	@computed get levers() {
		// TODO not so efficient
		const machine = this.app.performance.program.state.machine;
		const muted = machine.mute;
		const muteInfo = (channelGroup: ChannelGroupTOFIX) => ({
			muted: muted[channelGroup],
			setMuted: (muted: boolean) => machine.setMuted(channelGroup, muted),
		});

		return {
			B: muteInfo("bass"),
			H: muteInfo("hihat"),
			S: muteInfo("snare"),
			K: muteInfo("bassdrum"),
			C: muteInfo("crash"),
			V: muteInfo("vibraphone"),
		};
	}

	render() {
		return (
			<svg
				viewBox={`-50 -50 ${100} ${100}`}
				style={{
					width: this.width,
					height: this.height,
				}}
			>
				{range(0, 5).map((offset) => (
					<Connector offset={offset} key={offset} />
				))}
				{Object.entries(this.levers).map(
					([char, { muted, setMuted }], offset) => (
						<GroupLever
							offset={offset}
							char={char}
							muted={muted}
							setMuted={setMuted}
							key={offset}
						/>
					)
				)}
			</svg>
		);
	}
}

export const MutingLevers = AppComponent.sync(MutingLevers_);
