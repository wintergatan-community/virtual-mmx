interface TimelineTabProps {
    label: string;
    selected: boolean;
    select: () => void;
}
export declare const TimelineTab: (props: TimelineTabProps) => JSX.Element;
export declare const TimelineTabs: () => JSX.Element;
export {};
