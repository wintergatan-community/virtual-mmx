import React from "react";
import { WheelChannel } from "./WheelChannel";
import { SubdivisionLine } from "./SubdivisionLine";
import { useStores } from "../../contexts/StoreContext";
import { observer } from "mobx-react";

export const ProgramGrid = observer(() => {
	return (
		<>
			<WheelChannels />
			<SubdivisionLines />
		</>
	);
});

const SubdivisionLines = observer(() => {
	const { wheel } = useStores();

	return (
		<g>
			{wheel.subdivisionLines.map((tick, i) => (
				<SubdivisionLine tick={tick} key={tick} />
			))}
		</g>
	);
});

const WheelChannels = observer(() => {
	const { wheel } = useStores();

	return (
		<g>
			{wheel.pegChannelDatas.map((data, channel) => {
				return (
					<WheelChannel
						data={data.partData}
						channel={channel}
						key={channel}
					/>
				);
			})}
		</g>
	);
});
