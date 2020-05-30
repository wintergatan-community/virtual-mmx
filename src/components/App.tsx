import React from "react";
import { ProgramEditor } from "./ProgramEditor/ProgramEditor";
import { TransportControls } from "./transport/TransportContols";
import { observer } from "mobx-react";

export const App = observer(() => {
	return (
		<>
			<ProgramEditor />
			<TransportControls />
		</>
	);
});
