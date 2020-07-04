import React from "react";
import { TranslateGrid } from "./TranslateGrid";
import { computed, action } from "mobx";
import { WheelComponent } from "../storeComponents";

class PegPlacer_ extends WheelComponent {
	@computed get channelPart() {
		const channelNumber = this.wheel.gridSnappedMousePos?.mouseChannel;
		if (channelNumber === undefined) return null;
		return this.wheel.instrumentChannels[channelNumber].vmmxInstrumentChannel
			.channelPart;
	}
	@computed get mouse() {
		// TODO this doesn't seem right but MobX is being lame
		return this.wheel.gridSnappedMousePos;
	}
	@computed get alreadyPlaced() {
		if (!this.mouse || !this.channelPart) return true;
		const m = this.mouse;
		return this.channelPart.pegs.some((t) => t === m.mouseTick);
	}
	@action.bound addPeg() {
		if (!this.mouse) return;
		this.channelPart?.add(this.mouse.mouseTick);
	}
	@computed get height() {
		return this.wheel.tickToPixel(this.wheel.ticksPerNoteSubdivision);
	}

	render() {
		return this.alreadyPlaced || !this.mouse ? null : (
			<TranslateGrid
				tick={this.mouse.mouseTick}
				channel={this.mouse.mouseChannel}
			>
				<rect
					onMouseDown={this.addPeg}
					onMouseMove={(e) => e.buttons === 1 && this.addPeg()}
					width={this.wheel.channelToPixel(1)}
					height={this.height}
					fill="#0004"
				/>
			</TranslateGrid>
		);
	}
}

export const PegPlacer = WheelComponent.sync(PegPlacer_);
