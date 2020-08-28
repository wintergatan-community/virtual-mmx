/// <reference types="webmidi" />
import { Note } from "vmmx-schema";
export default class MidiUse {
    constructor(onNote: (note: Note) => void);
    onNote: (note: Note) => void;
    start(): void;
    onMIDISuccess: (midiAccess: WebMidi.MIDIAccess) => void;
    onMIDIFailure(): void;
}
