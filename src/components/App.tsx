import React from "react";
import EditorContextProvider from "../contexts/EditorContext";
import ProgramEditor from "./ProgramEditor/ProgramEditor";
import TransportControls from "./transport/TransportContols";
import GlobalContextProvider from "../contexts/GlobalContext";

export default function App() {
	return (
		<GlobalContextProvider>
			<EditorContextProvider>
				<ProgramEditor />
			</EditorContextProvider>
			<TransportControls />
		</GlobalContextProvider>
	);
}
