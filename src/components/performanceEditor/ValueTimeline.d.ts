interface ValueTimelineProps {
    labels: number[];
    children: (valueToPixel: (value: number) => number) => JSX.Element;
}
export declare const ValueTimeline: (props: ValueTimelineProps) => JSX.Element;
export {};
