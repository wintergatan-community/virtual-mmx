import { SubdivisionOption } from "./SubdivisionOption";

import eighthIcon from "./noteIcons/eighth.png";
import quarterIcon from "./noteIcons/quarter.png";
import sixteenthIcon from "./noteIcons/sixteenth.png";
import tripletIcon from "./noteIcons/triplet.png";
import wholeIcon from "./noteIcons/whole.png";
import { useContext, For } from "solid-js";
import { keys } from "../../../core/helpers/functions";
import { NoteSubdivision } from "../programmingWheelDisplay";
import { ProgrammingWheelContext } from "../ProgrammingWheel";

const icons: Record<NoteSubdivision, any> = {
	eighth: eighthIcon,
	quarter: quarterIcon,
	sixteenth: sixteenthIcon,
	triplet: tripletIcon,
	whole: wholeIcon,
};

export const SubdivisionChooser = () => {
	const { wheel } = useContext(ProgrammingWheelContext);

	const subdivionsOptions = keys(wheel.ticksPerNoteSubdivisions()).map(
		(division) => ({
			division,
			icon: icons[division as NoteSubdivision],
		})
	);

	function selectSubdivision(division: NoteSubdivision) {
		wheel.setSubdivision(division);
	}

	return (
		<div
			style={{
				display: "flex",
				height: "20px",
				"border-radius": "4px",
				padding: "3px",
				overflow: "hidden",
			}}
		>
			<For each={subdivionsOptions}>
				{({ division, icon }) => (
					<SubdivisionOption
						division={division}
						icon={icon}
						select={selectSubdivision}
					/>
				)}
			</For>
		</div>
	);
};
