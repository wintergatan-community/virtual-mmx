import React from "react";
import EditorContextProvider from "../contexts/EditorContext";
import { ProgramEditor } from "./ProgramEditor";

export default function App() {
	return (
		<div style={{ display: "flex" }}>
			<EditorContextProvider>
				<ProgramEditor />
				{/* <MMXRender/> */}
			</EditorContextProvider>
		</div>
	);
}
