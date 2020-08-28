import { ChannelColor, DisplayChannel } from "./programmingWheelDisplay";
import { Signal } from "../../core/helpers/solid";
interface WheelChannelProps {
    displayChannel: DisplayChannel;
    channelNumber: Signal<number>;
    channelColor: ChannelColor;
}
export declare const WheelChannel: (props: WheelChannelProps) => JSX.Element;
export {};
