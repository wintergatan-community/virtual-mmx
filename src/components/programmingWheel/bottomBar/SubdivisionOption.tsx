import { WheelComponent } from "../../storeComponents";
import React from "react";
import { NoteSubdivision } from "../../../core/helpers/types";
import { action, computed } from "mobx";

interface SubdivisionOptionProps {
	division: NoteSubdivision;
	icon: any;
	select: (division: NoteSubdivision) => void;
}

class SubdivisionOption_ extends WheelComponent<SubdivisionOptionProps> {
	@action.bound select() {
		this.props.select(this.props.division);
	}

	@computed get selected() {
		return this.wheel.subdivision === this.props.division;
	}

	render() {
		return (
			<div
				style={{
					display: "flex",
					width: 20,
					backgroundColor: this.selected
						? "rgb(106, 180, 250)"
						: "rgb(193, 193, 193)",
					border: "1px rgb(166, 166, 166) solid",
					borderTop: 0,
					borderBottom: 0,
					cursor: "pointer",
					userSelect: "none",
				}}
				onClick={this.select}
			>
				<img src={this.props.icon} style={{ width: "100%", height: "100%" }} />
			</div>
		);
	}
}

export const SubdivisionOption = WheelComponent.sync(SubdivisionOption_);
