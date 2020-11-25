import { VmmxSound } from "../types";
import { ToneChannel } from "../toneChannel";
import { AppStore } from "../../../stores/app";
import { Sampler } from "tone";
import { HiHatMachineModeE } from "../../eventTimelines/concrete";
export declare class HiHatMachineSound extends VmmxSound<HiHatMachineModeE> {
    hiHatMachineSample?: Sampler;
    toneChannel: ToneChannel<HiHatMachineModeE>;
    constructor(appStore: AppStore);
    triggerStrike: (_?: HiHatMachineModeE | undefined, time?: number | undefined) => void;
    onToneLoad(): void;
}
