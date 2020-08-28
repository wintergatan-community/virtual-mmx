import { EventBase, LoneEventDif } from "../types/other";
import { EventTimeline } from "../base";
export declare class LoneEventTimeline<E extends EventBase> extends EventTimeline<E> {
    events: import("../../helpers/solid").Signal<E[]>;
    getAddDifs(event: E): LoneEventDif<E>[] | null;
    getRemoveDifs(event: E): LoneEventDif<E>[] | null;
    applyDifs(difs: LoneEventDif<E>[]): void;
}
