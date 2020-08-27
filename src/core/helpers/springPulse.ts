import { createSignal } from "solid-js";
import { signal } from "./solid";

export class SpringPulse {
	stiffness = 100; // kg/s^2
	damping = 0; // kg/s
	mass = 1;

	private x = signal(0);
	private v = 0;
	private restingValue = 0;

	private tolerance = 0.001;

	private updating = false;
	private lastTime = 0;

	get value() {
		return this.x();
	}

	private startUpdating() {
		if (this.updating) return;
		this.updating = true;
		this.update(this.lastTime);
	}

	private update = (timeMillis: number) => {
		const time = timeMillis / 1000;
		const timeDelta = 1 / 60; // time - this.lastTime; -> TODO using animationFrame times had issues
		this.lastTime = time;
		const displaced = this.x() - this.restingValue;
		const f = -displaced * this.stiffness;
		const damp = this.damping * this.v;
		const a = (f - damp) / this.mass;
		this.v += a * timeDelta;
		this.x(this.x() + this.v * timeDelta);
		if (
			Math.abs(this.v) > this.tolerance ||
			Math.abs(displaced) > this.tolerance
		) {
			requestAnimationFrame(this.update);
		} else {
			this.x(this.restingValue);
			this.updating = false;
		}
	};

	applyCollision(impulse: number) {
		this.v += impulse / this.mass;
		this.startUpdating();
	}

	moveTo(restingValue: number) {
		this.restingValue = restingValue;
		this.startUpdating();
	}

	snapTo(restingValue: number) {
		const offset = this.x() - this.restingValue;
		this.restingValue = restingValue;
		this.x(restingValue + offset);
		this.startUpdating();
	}
}
