export interface MarbleEvent {
	tick: number;
	channel: number;
}
// currently doesn't conform to schema for simplicity TODO

export type NoteSubdivision = "quarter" | "eighth" | "sixteenth" | "triplet";
