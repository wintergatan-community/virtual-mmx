import { PerformanceAction } from "./other";
import { signal } from "../../core/helpers/solid";

export class PerformanceEditorStore {
	performanceActions: PerformanceAction[] = [
		"Muting Levers",
		"Bass Capo",
		"Hihat Opening",
	];

	selectedAction = signal<PerformanceAction | undefined>(
		this.performanceActions[1]
	);

	setAction(action: PerformanceAction) {
		this.selectedAction(action);
	}

	open = signal(false);

	show() {
		this.open(true);
	}
	hide() {
		this.open(false);
	}
	toggleShow() {
		open() ? this.hide() : this.show();
	}
}
