import { action, observable } from "mobx";
import { Point } from "../../core/helpers/functions";

export class MouseTracker {
	private element: SVGRectElement | SVGSVGElement | undefined;
	@observable mousePos: Point | undefined;
	scale: Point | undefined;
	box: DOMRect | undefined;

	setElement(element: SVGRectElement | SVGSVGElement) {
		this.element = element;
		this.box = this.element.getBoundingClientRect();
	}

	@action.bound update<T>(e: React.MouseEvent<T, MouseEvent>) {
		if (!this.element || !this.box) return;
		const scale = this.scale ?? { x: 1, y: 1 };
		const x = (e.clientX - this.box.left) * scale.x;
		const y = (e.clientY - this.box.top) * scale.y;
		this.mousePos = { x, y };
	}

	@action.bound leave() {
		this.mousePos = undefined;
	}
}
