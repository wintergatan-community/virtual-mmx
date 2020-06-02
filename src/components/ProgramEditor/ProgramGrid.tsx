import React from "react";
import { WheelChannel } from "./WheelChannel";
import { SubdivisionLine } from "./SubdivisionLine";
import { useStores } from "../../contexts/StoreContext";
import { observer } from "mobx-react";

export const ProgramGrid = observer(() => {
	return (
		<>
			<RunningChannels />
			<SubdivisionLines />
		</>
	);
});

const SubdivisionLines = observer(() => {
	const { wheel } = useStores();

	return (
		<g>
			{wheel.subdivisionLines.map((tick) => (
				<SubdivisionLine tick={tick} key={tick} />
			))}
		</g>
	);
});

const RunningChannels = observer(() => {
	const { wheel } = useStores();

	return (
		<g>
			{wheel.partData.map((data, channel) => {
				return <WheelChannel data={data} channel={channel} key={channel} />;
			})}
		</g>
	);
});
