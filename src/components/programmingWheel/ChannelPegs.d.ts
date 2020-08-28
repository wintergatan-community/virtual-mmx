import { VibraphoneDropE, DropEventTimeline, DropE } from "../../core/eventTimelines/concrete";
import { Signal } from "../../core/helpers/solid";
interface ChannelPegsProps {
    timeline: DropEventTimeline<VibraphoneDropE>;
}
export declare const ChannelPegs: (props: ChannelPegsProps) => JSX.Element;
interface MaybeRenderedPegProps {
    pegTick: Signal<number>;
    timeline: DropEventTimeline<DropE>;
}
export declare const MaybeRenderedPeg: (props: MaybeRenderedPegProps) => JSX.Element;
export {};
