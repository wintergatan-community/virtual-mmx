import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
export class HiHat extends Component {
	render() {
		return (
			<g style={{ transform: "translate(59.5px, 21.5px)" }}>
				<circle
					r={19.5}
					fill="rgb(253, 227, 165)"
					stroke="rgb(209, 179, 107)"
					strokeWidth={1}
				/>
				<circle r={2.5} fill="rgb(125, 125, 125)" />
			</g>
		);
	}
}
