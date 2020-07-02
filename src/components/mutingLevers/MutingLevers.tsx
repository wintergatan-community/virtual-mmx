import React from "react";
import { AppComponent } from "../storeComponents";
import { GroupLever } from "./GroupLever";
import { range } from "../../core/helpers/functions";
import { Connector } from "./Connector";
import { computed } from "mobx";

class MutingLevers_ extends AppComponent {
	width = 160;
	height = 160;

	@computed get levers() {
		const i = this.app.player.instruments;
		const bass = i.bass.channels;
		const drums = i.drums.channels;
		const vibraphone = i.vibraphone.channels;
		return {
			B: Object.values(bass).map((c) => c.channelPart),
			H: [drums.hihat.channelPart],
			S: [drums.snare.channelPart],
			K: [drums.bassdrum.channelPart],
			C: [drums.crash.channelPart],
			V: Object.values(vibraphone).map((c) => c.channelPart),
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
				{Object.entries(this.levers).map(([char, channels], offset) => (
					<GroupLever
						offset={offset}
						char={char}
						channels={channels}
						key={offset}
					/>
				))}
			</svg>
		);
	}
}

export const MutingLevers = AppComponent.sync(MutingLevers_);
