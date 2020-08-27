import { range } from "../../core/helpers/functions";
import { useContext } from "solid-js";
import { AppContext } from "../../stores/app";

export const HiHatOpeningActionEditor = () => {
	const app = useContext(AppContext);

	const timeline = app.performance.eventTimelines.hihat.hatOpen;
	const axisValues = range(0, 60, 10);

	return <g>{/* <LabelAxis axisValues={this.axisValues} /> */}</g>;
};
