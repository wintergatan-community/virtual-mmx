import React from "react";
import { computed, action, observable } from "mobx";
import { Capo } from "./Capo";
import { bassStrings } from "../../core/playback/types";
import { BassComponent } from "../storeComponents";
import { BassStringStore } from "../../stores/bass";

interface StringProps {
	stringStore: BassStringStore;
}

export class String_ extends BassComponent<StringProps> {
	@computed get x() {
		return this.bass.stringToPixel(this.props.stringStore.string);
	}

	@computed get width() {
		return this.bass.viewWidth / bassStrings.length - 2;
	}

	@action.bound handleScroll(/*e: React.WheelEvent<SVGRectElement>*/) {
		// bass.strings[this.props.string].capoPos += e.deltaY / 20;
	}

	@action.bound strum(e: React.MouseEvent<SVGLineElement, MouseEvent>) {
		if (e.buttons === 1 && !this.plucked) {
			this.bassStringChannel.triggerStrike();
			this.strike();
		}
	}
	@observable plucked = false;

	@action.bound endStrike() {
		this.plucked = false;
	}
	@action.bound strike() {
		this.plucked = true;
	}

	get bassStringChannel() {
		return this.app.player.instruments.bass.channels[
			this.props.stringStore.string
		];
	}

	render() {
		return (
			<g style={{ transform: `translateX(${this.x}px)` }}>
				<line
					// string
					y1={0}
					y2={this.bass.viewHeight}
					x1={0}
					x2={0}
					stroke="rgb(195, 195, 195)"
					strokeWidth={1.5}
					className={this.plucked ? "bassPlucked" : ""}
					onAnimationEnd={this.endStrike}
				/>
				<line
					// strum hit box
					y1={0}
					y2={this.bass.viewHeight}
					x1={0}
					x2={0}
					stroke="#0004"
					strokeWidth={6}
					onMouseEnter={this.strum}
					onClick={() => console.log(2)}
					style={{ pointerEvents: "all" }}
				/>
				<Capo stringStore={this.props.stringStore} />
			</g>
		);
	}
}

export const String = BassComponent.sync(String_);
