interface MediaButtonProps {
    click: () => void;
    color: string;
    title: string;
    children: JSX.Element;
}
export declare const MediaButton: (props: MediaButtonProps) => JSX.Element;
export {};
