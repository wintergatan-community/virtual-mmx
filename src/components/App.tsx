import React from "react";
import { ProgrammingWheel } from "./programEditor/ProgrammingWheel";
import { TransportControls } from "./transport/TransportContols";
import { MockupLayout } from "./mockupLayout/MockupLayout";
import { observer } from "mobx-react";
// import { TimingTesting } from "./timingTesting/TimingTesting";

// @observer
// export class App extends Component {
// 	render() {
// 		return <TimingTesting />;
// 	}
// }
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
