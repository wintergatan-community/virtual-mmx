import React from "react";
import { ProgrammingWheel } from "./programEditor/ProgrammingWheel";
import { TransportControls } from "./transport/TransportContols";
import { observer } from "mobx-react";
import { MockupLayout } from "./mockupLayout/MockupLayout";

export const App = observer(() => {
	return (
		<>
			<MockupLayout />
			<div style={{ transform: "translate(103px, 103px)" }}>
				<ProgrammingWheel />
			</div>
			<TransportControls />
		</>
	);
});
