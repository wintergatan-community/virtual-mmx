import { LoneEventTimeline } from "./variations/lone";
import { EventBase } from "./types/other";
import { SegmentEventTimeline } from "./variations/segment";
import { PolylineEventTimeline } from "./variations/polyline";
import { Curve } from "./types/curves";

// Drop

export class DropEventTimeline<E extends DropE> extends LoneEventTimeline<E> {}

export class BassDropEventTimeline extends DropEventTimeline<BassDropE> {}
export type DrumsDropEventTimeline =
	| HiHatDropEventTimeline
	| DropEventTimeline<DropE>;
export class HiHatDropEventTimeline extends DropEventTimeline<HiHatDropE> {}
export class VibraphoneDropEventTimeline extends DropEventTimeline<
	VibraphoneDropE
> {}

// these might be replaced with the ones in schema out of the box, but don't contain redundant info
export class DropE extends EventBase {}
export class BassDropE extends DropE {
	fret?: number;

	constructor(data: { fret?: number; tick: number }) {
		super(data);
		this.fret = data.fret;
	}
}
export type DrumsDropE = HiHatDropE | DropE;
export class HiHatDropE extends DropE {
	hatOpen?: number;

	constructor(data: { hatOpen?: number; tick: number }) {
		super(data);
		this.hatOpen = data.hatOpen;
	}
}
export class VibraphoneDropE extends DropE {}

// Mute

export class MuteEventTimeline extends SegmentEventTimeline<MuteE> {
	isStarting(event: MuteE) {
		return event.mute;
	}
}
export class MuteE extends EventBase {
	mute: boolean;

	constructor(data: { mute: boolean; tick: number }) {
		super(data);
		this.mute = data.mute;
	}
}

// Vibraphone

export class VibraphoneVibratoEventTimeline extends PolylineEventTimeline<
	VibraphoneVibratoE
> {
	eventCanBePlacedOnCurve(
		event: VibraphoneVibratoE,
		curve: Curve<VibraphoneVibratoE> | null
	): boolean {
		if (curve?.start.enabled === event.enabled) {
			return false;
		}
		return true;
	}
}
export class VibraphoneVibratoE extends EventBase {
	enabled?: boolean;
	speed?: number;

	constructor(data: { enabled?: boolean; speed: number; tick: number }) {
		super(data);
		this.enabled = data.enabled;
		this.speed = data.speed;
	}
}

// Capo

export class CapoEventTimeline extends PolylineEventTimeline<CapoE> {
	eventCanBePlacedOnCurve(): boolean {
		return true;
	}
}

export class CapoE extends EventBase {
	moveFret: number;

	constructor(data: { moveFret: number; tick: number }) {
		super(data);
		this.moveFret = data.moveFret;
	}
}
