import React from "react";
import { Provider } from "mobx-react";
import { AppComponent } from "../storeComponents";
import { VibraphoneBar } from "./VibraphoneBar";

export class VibraphoneDisplayStore {
	wholeWidth = 400;
	noteWidth = this.wholeWidth / 11;
	noteWidthPadded = this.noteWidth * 0.9;
}

class Vibraphone_ extends AppComponent {
	vibra = new VibraphoneDisplayStore();
	height = 160;

	render() {
		return (
			<Provider vibra={this.vibra}>
				<svg
					viewBox={`0 0 ${this.vibra.wholeWidth} ${this.height}`}
					style={{
						width: this.vibra.wholeWidth,
						height: this.height,
						border: "1px red solid",
					}}
				>
					<g
						style={{
							transform: `translateY(${this.height / 2}px)`,
						}}
					>
						{Object.values(this.app.program.state.vibraphone.barStores).map(
							(barStore) => (
								<VibraphoneBar barStore={barStore} key={barStore.bar} />
							)
						)}
					</g>
				</svg>
			</Provider>
		);
	}
}

export const Vibraphone = AppComponent.sync(Vibraphone_);
