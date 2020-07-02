import React from "react";
import { WheelComponent } from "../../storeComponents";
import { SubdivisionChooser } from "./SubdivisionChooser";

class BottomBar_ extends WheelComponent {
	render() {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					padding: 3,
					backgroundColor: "rgb(210, 210, 210)",
				}}
			>
				<SubdivisionChooser />
			</div>
		);
	}
}

export const BottomBar = WheelComponent.sync(BottomBar_);
