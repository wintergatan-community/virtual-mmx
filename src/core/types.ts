import { ReactElement } from "react";

export type NoteSubdivision =
	| "whole"
	| "quarter"
	| "eighth"
	| "sixteenth"
	| "triplet";

export type SomeReactChildren = ReactElement[] | ReactElement;
