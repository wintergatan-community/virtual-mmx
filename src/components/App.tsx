import React from "react";
import { ProgrammingWheel } from "./ProgramEditor/ProgrammingWheel";
import { TransportControls } from "./transport/TransportContols";
import { observer } from "mobx-react";

export const App = observer(() => {
	return (
		<>
			<ProgrammingWheel />
			<TransportControls />
		</>
	);
});
