import React from "react";
import { BassComponent } from "../storeComponents";
import { BassStringStore } from "../../stores/bass";
interface StringProps {
    stringStore: BassStringStore;
}
export declare class String_ extends BassComponent<StringProps> {
    get x(): number;
    get width(): number;
    handleScroll(): void;
    strum(e: React.MouseEvent<SVGLineElement, MouseEvent>): void;
    plucked: boolean;
    endStrike(): void;
    strike(): void;
    get bassStringChannel(): import("../../core/playback/instruments/bass").BassStringChannel;
    render(): JSX.Element;
}
export declare const String: (React.FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (React.ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (React.ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (React.ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
export {};
