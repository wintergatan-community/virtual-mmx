import React from "react";

interface MediaButtonProps {
	click: () => void;
	color: string;
	children: JSX.Element;
}

export const MediaButton = (props: MediaButtonProps) => (
	<div
		style={{
			display: "flex",
			width: 35,
			height: 35,
			backgroundColor: props.color,
			borderRadius: 6,
			margin: 2,
			cursor: "pointer",
			userSelect: "none",
			transition: "0.1s",
		}}
		onClick={props.click}
	>
		{props.children}
	</div>
);
