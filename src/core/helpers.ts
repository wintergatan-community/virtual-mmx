import { VibraphoneChannel, VibraphoneState } from "vmmx-schema";

export function vibraphoneChannelToNote(
	channel: VibraphoneChannel,
	vibraphoneState: VibraphoneState
): string {
	const note = vibraphoneState.notes[channel];
	return note;
}
