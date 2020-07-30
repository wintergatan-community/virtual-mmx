import React from "react";
import { TranslateGrid } from "./TranslateGrid";
import { computed, action } from "mobx";
import { WheelComponent } from "../storeComponents";

class PegPlacer_ extends WheelComponent {
	@computed get timeline() {
		const channelNumber = this.wheel.gridSnappedMousePos?.mouseChannel;
		if (channelNumber === undefined) return null;
		return this.wheel.instrumentChannels[channelNumber].timeline;
	}
	@computed get mouse() {
		return this.wheel.gridSnappedMousePos;
	}
	@computed get alreadyPlaced() {
		if (!this.mouse || !this.timeline) return true;
		const m = this.mouse;
		return this.timeline.events.some((e) => e.tick === m.mouseTick);
	}
	@action.bound addPeg() {
		if (!this.mouse) return;
		this.timeline?.add({ tick: this.mouse.mouseTick });
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
