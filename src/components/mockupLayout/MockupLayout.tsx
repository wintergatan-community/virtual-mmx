import React from "react";
import { observer } from "mobx-react";
import layout from "./layoutCropped.jpg";

export const MockupLayout = observer(() => {
	return (
		<img
			src={layout}
			alt="layout"
			style={{
				position: "absolute",
				width: 1280,
				height: 860,
				zIndex: -1,
				overflow: "hidden",
			}}
		/>
	);
});
