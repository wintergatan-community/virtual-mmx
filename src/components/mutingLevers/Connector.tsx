import React from "react";
import { AppComponent } from "../storeComponents";
import { mapValue } from "../../core/helpers/functions";
import { computed } from "mobx";

interface ConnectorProps {
	offset: number;
}

class Connector_ extends AppComponent<ConnectorProps> {
	@computed get x() {
		return offsetToPixel(this.props.offset);
	}

	@computed get width() {
		return offsetToPixel(1) - offsetToPixel(0);
	}

	@computed get height() {
		return 30 / (this.props.offset + 3);
	}

	render() {
		return (
			<rect
				x={this.x}
				y={-this.height / 2}
				width={this.width}
				height={this.height}
				fill="rgb(159, 159, 159)"
			/>
		);
	}
}

export const Connector = AppComponent.sync(Connector_);

export function offsetToPixel(offset: number) {
	// TODO move to local provider
	const pad = 10;
	return mapValue(offset, 0, 5, pad, 200 - pad) - 100;
}
