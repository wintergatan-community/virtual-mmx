import { Component } from "react";
export declare class TimingTesting extends Component {
    tpq: number;
    currentTick: number;
    markerTicks: number[];
    componentDidMount(): void;
    updateTick(): void;
    suspend: () => void;
    render(): JSX.Element;
}
