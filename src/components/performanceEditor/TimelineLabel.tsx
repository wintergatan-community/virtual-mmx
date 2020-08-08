import React from "react";
import { AppComponent } from "../storeComponents";

interface TimelineLabelProps {
	label: string;
	y: number;
}

class TimelineLabel_ extends AppComponent<TimelineLabelProps> {
	render() {
		return (
			<g transform={`translate(0, ${this.props.y})`}>
				<rect width={90} height={18} y={-9} x={-4} fill="#b7b7b7" rx={9} />
				<text x={10} fontSize={11} y={4} fill="#434343">
					{this.props.label}
				</text>
			</g>
		);
	}
}
export const TimelineLabel = AppComponent.sync(TimelineLabel_);
