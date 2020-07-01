import { observable, action } from "mobx";

export class ForcePulse {
	@observable x = 0;
	private v = 0;

	tension = 0.03;
	friction = 0.8;
	mass = 1;

	@observable updating = false;
	tolerance = 0.001;

	private startUpdating() {
		if (this.updating) return;
		this.updating = true;
		this.update();
	}

	@action.bound private update() {
		const f = -this.x * this.tension;
		const a = f / this.mass;
		this.v += a;
		this.v *= this.friction;
		this.x += this.v;

		if (
			Math.abs(this.v) > this.tolerance ||
			Math.abs(this.x) > this.tolerance
		) {
			requestAnimationFrame(this.update);
		} else {
			this.updating = false;
		}
	}

	applyCollision(velocity: number) {
		this.v = velocity;
		this.startUpdating();
	}
}
