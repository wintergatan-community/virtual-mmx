import { Part } from "tone";
export declare class ChannelPart {
    readonly tonePart: Part<any>;
    readonly pegs: number[];
    listeners: (() => void)[];
    muted: boolean;
    constructor(triggerStrike: (tick: number) => void);
    add(tick: number): void;
    remove(tick: number): void;
    runOnNote(callback: () => void): void;
}
