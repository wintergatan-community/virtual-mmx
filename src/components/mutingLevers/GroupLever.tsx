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
		const pad = 60;
		// TODO move to local provider
		return mapValue(this.props.offset, 0, 5, pad, 300 - pad) - 150;
	}

	@computed get y() {
		const amp = 30;
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
						style={{ cursor: "pointer" }}
					>
						<rect
							x={-6}
							y={-10}
							width={12}
							height={20}
							fill="rgb(114, 114, 114)"
						/>
						<line
							y1={yProps.y / 10}
							y2={yProps.y}
							stroke="rgb(175, 175, 175)"
							strokeWidth={4}
						/>
						<circle cy={yProps.y} r={12} fill="rgb(47, 47, 47)" />
						<text
							y={yProps.y + 6}
							fontSize={18}
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
