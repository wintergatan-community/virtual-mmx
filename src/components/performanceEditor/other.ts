export interface DraggableCollisionEvent {
	velocity: number;
	side: "left" | "right";
}

export interface PerformanceAction {
	label: "Muting Levers" | "Bass Fretting" | "BPM" | "Hihat Opening";
}
