import React from "react";
import EditorContextProvider from "../contexts/EditorContext";
import { ProgramEditor } from "./ProgramEditor/ProgramEditor";

export default function App() {
	return (
		<div style={{ display: "flex" }}>
			<div style={{ width: 100, height: 100 }}></div>
			<EditorContextProvider>
				<div style={{ position: "relative", display: "flex" }}>
					<ProgramEditor />
					{/* <MMXRender/> */}
					{/* <svg
						viewBox="0 0 500 500"
						style={{ width: 500, height: 500, left: 0, position: "absolute" }}
					>
						<rect width={20} height={20} />
					</svg> */}
				</div>
			</EditorContextProvider>
		</div>
	);
}
