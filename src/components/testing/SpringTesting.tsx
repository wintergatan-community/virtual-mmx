import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { Spring } from "react-spring/renderprops";

@observer
export class SpringTesting extends Component {
	@observable active = false;

	@action.bound toggle() {
		this.active = !this.active;
	}
	render() {
		return (
			<Spring
				// from={{ fill: "black" }}
				to={{ fill: this.active ? "red" : "black", x: this.active ? 100 : 0 }}
			>
				{(props) => (
					<div
						style={{
							width: 200,
							height: 200,
							background: props.fill,
							transform: `translateX(${props.x}px)`,
						}}
						onClick={this.toggle}
					></div>
				)}
			</Spring>
		);
	}
}
