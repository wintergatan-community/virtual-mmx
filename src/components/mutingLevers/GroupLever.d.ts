import { MuteEventTimeline } from "../../core/eventTimelines/concrete";
import { Getter } from "../../core/helpers/solid";
interface GroupLeverProps {
    offset: number;
    char: string;
    timeline: MuteEventTimeline;
    current: Getter<boolean>;
}
export declare const GroupLever: (props: GroupLeverProps) => JSX.Element;
export {};
