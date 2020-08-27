import { useContext } from "solid-js";
import { NoteSubdivision } from "../programmingWheelDisplay";
import { ProgrammingWheelContext } from "../ProgrammingWheel";

interface SubdivisionOptionProps {
	division: NoteSubdivision;
	icon: any;
	select: (division: NoteSubdivision) => void;
}

export const SubdivisionOption = (props: SubdivisionOptionProps) => {
	const { wheel } = useContext(ProgrammingWheelContext);

	function select() {
		props.select(props.division);
	}

	function selected() {
		return wheel.subdivision() === props.division;
	}

	return (
		<div
			style={{
				display: "flex",
				width: "20px",
				"background-color": selected()
					? "rgb(106, 180, 250)"
					: "rgb(193, 193, 193)",
				border: "1px rgb(166, 166, 166) solid",
				"border-top": "0px",
				"border-bottom": "0px",
				cursor: "pointer",
				"user-select": "none",
			}}
			onClick={select}
		>
			<div style={{ width: "10px", height: "10px", background: "black" }} />
			<img src={props.icon} style={{ width: "100%", height: "100%" }} />
		</div>
	);
};
