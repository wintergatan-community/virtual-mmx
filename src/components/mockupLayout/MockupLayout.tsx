import React, { Component } from "react";
import layout from "./layoutDigital.png";

export class MockupLayout extends Component {
	render() {
		return (
			<img
				src={layout}
				alt="layout"
				style={{
					position: "absolute",
					width: 1280,
					height: 860,
					zIndex: -1,
					overflow: "hidden",
				}}
			/>
		);
	}
}
