interface StackedTimelineProps<T> {
    labels: T[];
    children: (label: T) => JSX.Element;
}
export declare function StackedTimeline<T extends string | number>(props: StackedTimelineProps<T>): JSX.Element;
export {};
