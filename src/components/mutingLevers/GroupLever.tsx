import React from "react";
import { AppComponent } from "../storeComponents";
import { computed, action, observable } from "mobx";
import { mapValue } from "../../core/helpers/functions";
import { Spring } from "react-spring/renderprops";

interface GroupLeverProps {
	offset: number;
	char: string;
	muted: boolean;
	setMuted: (muted: boolean) => void;
}

class GroupLever_ extends AppComponent<GroupLeverProps> {
	@computed get x() {
		const pad = 10;
		// TODO move to local provider
		return mapValue(this.props.offset, 0, 5, pad, 100 - pad) - 50;
	}

	@computed get y() {
		const amp = 14;
		return this.props.muted ? -amp : amp;
	}

	@action.bound handleToggle() {
		this.props.setMuted(!this.props.muted);
	}

	render() {
		return (
			<Spring to={{ y: this.y }} config={{ tension: 700, friction: 50 }}>
				{(yProps) => (
					<g
						transform={`translate(${this.x}, 0)`}
						onClick={this.handleToggle}
						onMouseEnter={(e) => e.buttons === 1 && this.handleToggle()}
					>
						<rect
							x={-3}
							y={-4}
							width={6}
							height={8}
							fill="rgb(114, 114, 114)"
						/>
						<line
							y1={-2}
							y2={yProps.y}
							stroke="rgb(175, 175, 175)"
							strokeWidth={2}
						/>
						<circle cy={yProps.y} r={5.5} fill="rgb(47, 47, 47)" />
						<text
							y={yProps.y + 3}
							fontSize={9}
							textAnchor="middle"
							fill="rgb(215, 215, 215)"
							style={{ userSelect: "none" }}
						>
							{this.props.char}
						</text>
					</g>
				)}
			</Spring>
		);
	}
}

export const GroupLever = AppComponent.sync(GroupLever_);
