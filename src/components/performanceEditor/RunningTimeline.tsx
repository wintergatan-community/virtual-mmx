import React, { Component, ReactNode } from "react";
import { observer } from "mobx-react";

interface RunningTimelineProps {
	label: string | number;
	y: number;
	children?: ReactNode;
}

@observer
export class RunningTimeline extends Component<RunningTimelineProps> {
	render() {
		return (
			<g transform={`translate(0, ${this.props.y})`}>
				<line x2={2000} stroke="#b7b7b7" />
				{this.props.children}
				<rect width={90} height={18} y={-9} x={-4} fill="#b7b7b7" rx={9} />
				<text x={10} fontSize={11} y={4} fill="#434343">
					{this.props.label}
				</text>
			</g>
		);
	}
}
