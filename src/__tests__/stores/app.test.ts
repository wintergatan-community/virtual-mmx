import {
	noteToVibraphoneLength,
	arrToPolyLine,
} from "../../core/helpers/functions";

test("noteToVibraphoneLength access", () => {
	expect(noteToVibraphoneLength("C-1")).toBe(420);
	expect(noteToVibraphoneLength("G9")).toBe(-88);
});

test("arrToPolyLine basic", () => {
	expect(arrToPolyLine([])).toBe("");
	expect(
		arrToPolyLine([
			[1, 1],
			[2, 2],
		])
	).toBe("1,1 2,2 ");
	expect(
		arrToPolyLine([
			[1.5, 1.2],
			[2.2, 2.0],
		])
	).toBe("1.5,1.2 2.2,2 ");
	// this is weird
	expect(arrToPolyLine([[1, 1], [2]])).toBe("1,1 2,undefined ");
	// TODO: maybe fix this to take numerics only...
});
