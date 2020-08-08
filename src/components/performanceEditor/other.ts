import { EventBase } from "../../stores/eventTimeline";
import { observable } from "mobx";

export class MuteEvent extends EventBase {
	@observable mute: boolean;

	constructor(data: { mute: boolean; tick: number }) {
		super(data);
		this.mute = data.mute;
	}
}

export interface DraggableCollisionEvent {
	velocity: number;
	side: "left" | "right";
}

export interface PerformanceAction {
	label: string;
}
