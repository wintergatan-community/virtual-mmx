import { VmmxInstrument, VmmxInstrumentChannel } from "../types";
import { DrumsStore } from "../../../stores/drums";
import { JointToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { DrumTypeTOFIX } from "../../../toFutureSchema";
import { DrumsDropE } from "../../eventTimelines/concrete";
export declare class DrumsInstrument implements VmmxInstrument<DrumTypeTOFIX, DrumsDropE> {
    drumsStore: DrumsStore;
    channels: Record<DrumTypeTOFIX, DrumsChannel>;
    constructor(appStore: AppStore, drumsStore: DrumsStore);
    onToneLoad(): void;
}
declare class DrumsChannel extends VmmxInstrumentChannel<DrumsDropE> {
    appStore: AppStore;
    toneChannels: JointToneChannel<DrumsDropE>;
    private drumSynth?;
    drum: DrumTypeTOFIX;
    constructor(appStore: AppStore, drum: DrumTypeTOFIX);
    triggerStrike: (_?: import("../../eventTimelines/concrete").DropE | import("../../eventTimelines/concrete").HiHatDropE | undefined, time?: number | undefined) => void;
    onToneLoad(): void;
}
export {};
