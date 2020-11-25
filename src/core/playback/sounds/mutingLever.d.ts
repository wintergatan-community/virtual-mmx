import { VmmxSound } from "../types";
import { AppStore } from "../../../stores/app";
import { Sampler } from "tone";
import { MuteE } from "../../eventTimelines/concrete";
import { ToneChannel } from "../toneChannel";
export declare class MutingLeverSound extends VmmxSound<MuteE> {
    muteChannels: ToneChannel<MuteE>[];
    mutingLeverSample?: Sampler;
    constructor(appStore: AppStore);
    triggerStrike: (_?: MuteE | undefined, time?: number | undefined) => void;
    onToneLoad(): void;
}
