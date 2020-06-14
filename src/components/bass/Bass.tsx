import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
export class Bass extends Component {
	width = 100;
	height = 600;

	render() {
		return (
			<svg
				viewBox={`0 0 ${100} ${600}`}
				style={{
					width: this.width,
					height: this.height,
					border: "1px blue solid",
				}}
			>
				<g style={{ transform: `translate(15px, 45px)` }}>
					<svg viewBox="0 0 100 100">
						<rect width={100} height={100} fill="#f004" />
					</svg>
				</g>
			</svg>
		);
	}
}
