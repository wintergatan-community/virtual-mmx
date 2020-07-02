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
						division={division}
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
/*
import React from "react";
import { NoteSubdivision } from "../../core/helpers/types";
import { computed, action } from "mobx";
import { WheelComponent } from "../storeComponents";

class SubdivisonChooser_ extends WheelComponent {
	render() {
		return (
			<g>
				{Object.keys(this.wheel.ticksPerNoteSubdivisions).map((division, i) => (
					<SubdivisonOption
						type={division as NoteSubdivision}
						y={i * 40}
						key={division}
					/>
				))}
			</g>
		);
	}
}

export const SubdivisonChooser = WheelComponent.sync(SubdivisonChooser_);

interface SubdivisonOptionProps {
	type: NoteSubdivision;
	y: number;
}

class SubdivisonOption_ extends WheelComponent<SubdivisonOptionProps> {
	@action.bound handleClick() {
		this.wheel.setSubdivision(this.props.type);
	}
	@computed get x() {
		return this.wheel.channelWidth - 40;
	}
	@computed get y() {
		return this.wheel.visiblePixelHeight - 40 - this.props.y;
	}

	render() {
		return (
			<g
				style={{
					transform: `translate(${this.x}px, ${this.y}px)`,
					position: "static", // TODO unneeded?
				}}
				onClick={this.handleClick}
			>
				<rect width={40} height={40} fill="white" stroke="black" />
				<text x={20} y={20} textAnchor="middle" fontSize={10}>
					{this.props.type}
				</text>
			</g>
		);
	}
}

export const SubdivisonOption = WheelComponent.sync(SubdivisonOption_);
*/
