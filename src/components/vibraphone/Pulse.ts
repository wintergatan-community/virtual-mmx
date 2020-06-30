import { observable, action } from "mobx";

export class ForcePulse {
	@observable x = 0;
	private v = 0;
	tension = 0.02;
	friction = 0.8;
	m = 1;
	@observable updating = false;

	startUpdating() {
		if (this.updating) return;
		this.updating = true;
		this.update();
	}

	@action.bound update() {
		const f = -this.x * this.tension;
		const a = f / this.m;
		this.v += a;
		this.v *= this.friction;
		this.x += this.v;

		if (Math.abs(this.v) > 0.001 || Math.abs(this.x) > 0.001) {
			requestAnimationFrame(this.update);
		} else {
			this.updating = false;
		}
	}

	applyCollision() {
		this.v = 3;
		this.startUpdating();
	}
}
