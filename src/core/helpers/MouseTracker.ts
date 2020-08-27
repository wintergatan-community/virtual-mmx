import { Point } from "../../core/helpers/functions";
import { signal } from "./solid";

export class MouseTracker {
	private element?: SVGRectElement | SVGSVGElement;
	mousePos = signal<Point | undefined>(undefined);
	scale = signal({ x: (val: number) => val, y: (val: number) => val });

	setElement(element: SVGRectElement | SVGSVGElement) {
		this.element = element;

		element.addEventListener("mousemove", (e) =>
			this.mouseMove(e as MouseEvent)
		);
		element.addEventListener("mouseleave", () => this.mousePos(undefined));
		// TODO unsubscribe
		element.addEventListener("change", () => console.log("change"));
	}

	private mouseMove(e: MouseEvent) {
		const box = this.element?.getBoundingClientRect();
		if (!box) return;
		const x = this.scale().x(e.clientX - box.left);
		const y = this.scale().y(e.clientY - box.top);
		this.mousePos({ x, y });
	}

	forceUpdate(e: MouseEvent) {
		this.mouseMove(e);
	}
}
