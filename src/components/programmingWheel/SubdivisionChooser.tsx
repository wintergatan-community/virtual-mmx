import React from "react";
import { NoteSubdivision } from "../../core/types";
import { computed, action } from "mobx";
import { WheelComponent } from "../storeComponents";

class SubdivisonChooser_ extends WheelComponent {
	render() {
		return (
			<g>
				{Object.keys(this.wheel.ticksPerNoteSubdivisions).map(
					(division, i) => (
						<SubdivisonOption
							type={division as NoteSubdivision}
							y={i * 40}
							key={division}
						/>
					)
				)}
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
