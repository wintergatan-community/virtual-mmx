import React from "react";
import { mapValue } from "../../core/helpers/functions";
import { TranslateGrid } from "./TranslateGrid";
import { computed } from "mobx";
import { WheelComponent } from "../storeComponents";

interface PegProps {
	pegTick: number;
	activeDivision: boolean;
	spawnsEvent: boolean;
	click?: () => void;
}

class Peg_ extends WheelComponent<PegProps> {
	@computed get w() {
		return 10;
	}
	@computed get h() {
		const hNormal =
			this.wheel.tickToPixel(this.wheel.ticksPerNoteSubdivision) - 5;
		return Math.min(20, Math.max(hNormal, 5));
	}
	@computed get shift() {
		const offset = this.wheel.pegOffsetFunction(this.props.pegTick);
		const end = this.wheel.channelToPixel(1) - this.w;
		return mapValue(offset, 0, 1, 0, end);
	}

	render() {
		return (
			<TranslateGrid tick={this.props.pegTick}>
				<rect
					width={this.w}
					height={this.h}
					fill={this.props.activeDivision ? "#ccc" : "#ccc9"}
					x={this.shift}
					rx={3}
					onClick={this.props.click}
				/>
			</TranslateGrid>
		);
	}
}

export const Peg = WheelComponent.sync(Peg_);
