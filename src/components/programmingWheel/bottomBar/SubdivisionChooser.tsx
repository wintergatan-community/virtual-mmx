import { WheelComponent } from "../../storeComponents";
import React from "react";
import { SubdivisionOption } from "./SubdivisionOption";
import { NoteSubdivision } from "../../../core/helpers/types";
import { action } from "mobx";

import eighthIcon from "./noteIcons/eighth.png";
import quarterIcon from "./noteIcons/quarter.png";
import sixteenthIcon from "./noteIcons/sixteenth.png";
import tripletIcon from "./noteIcons/triplet.png";
import wholeIcon from "./noteIcons/whole.png";

const icons: Record<NoteSubdivision, any> = {
	eighth: eighthIcon,
	quarter: quarterIcon,
	sixteenth: sixteenthIcon,
	triplet: tripletIcon,
	whole: wholeIcon,
};

class SubdivisionChooser_ extends WheelComponent {
	subdivionsOptions = Object.keys(this.wheel.ticksPerNoteSubdivisions).map(
		(division) => ({
			division,
			icon: icons[division as NoteSubdivision],
		})
	);

	@action.bound selectSubdivision(division: NoteSubdivision) {
		this.wheel.setSubdivision(division);
	}

	render() {
		return (
			<div
				style={{
					display: "flex",
					height: 20,
					borderRadius: 4,
					overflow: "hidden",
				}}
			>
				{this.subdivionsOptions.map(({ division, icon }) => (
					<SubdivisionOption
						division={division as NoteSubdivision}
						icon={icon}
						select={this.selectSubdivision}
						key={division}
					/>
				))}
			</div>
		);
	}
}

export const SubdivisionChooser = WheelComponent.sync(SubdivisionChooser_);
