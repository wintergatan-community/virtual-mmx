import { Component } from "react";
import { AppStore } from "../stores/app";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";
import { ProgrammingWheelDisplayStore } from "./programmingWheel/programmingWheelDisplay";
import { VibraphoneDisplayStore } from "./vibraphone/Vibraphone";
import { DrumsDisplayStore } from "./drums/drumsDisplay";
import { BassDisplayStore } from "./bass/bassDisplay";
export declare class AppComponent<Props = Record<string, unknown>> extends Component<Props> {
    get app(): AppStore;
    protected static inject(Comp: IReactComponent, toInject: string[]): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
    static sync<P>(Comp: IReactComponent<P>): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
}
export declare class VibraphoneComponent<Props = Record<string, unknown>> extends AppComponent<Props> {
    get vibra(): VibraphoneDisplayStore;
    protected static inject(Comp: IReactComponent, toInject: string[]): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
    static sync<P>(Comp: IReactComponent<P>): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
}
export declare class DrumsComponent<Props = Record<string, unknown>> extends AppComponent<Props> {
    get drums(): DrumsDisplayStore;
    protected static inject(Comp: IReactComponent, toInject: string[]): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
    static sync<P>(Comp: IReactComponent<P>): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
}
export declare class WheelComponent<Props = Record<string, unknown>> extends AppComponent<Props> {
    get wheel(): ProgrammingWheelDisplayStore;
    protected static inject(Comp: IReactComponent, toInject: string[]): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
    static sync<P>(Comp: IReactComponent<P>): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
}
export declare class BassComponent<Props = Record<string, unknown>> extends AppComponent<Props> {
    get bass(): BassDisplayStore;
    protected static inject(Comp: IReactComponent, toInject: string[]): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
    static sync<P>(Comp: IReactComponent<P>): (import("react").FunctionComponent<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ClassicComponentClass<any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ComponentClass<any, any> & import("mobx-react").IWrappedComponent<any>) | (import("react").ForwardRefExoticComponent<any> & import("mobx-react").IWrappedComponent<any>);
}
