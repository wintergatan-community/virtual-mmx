export interface DraggableCollisionEvent {
	velocity: number;
	side: "left" | "right";
}

export type PerformanceAction =
	| "Muting Levers"
	| "Bass Capo"
	| "BPM"
	| "Hihat Opening";
