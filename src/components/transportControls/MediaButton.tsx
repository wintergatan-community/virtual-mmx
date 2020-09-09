interface MediaButtonProps {
	click: () => void;
	color: string;
	title: string;
	children: JSX.Element;
}

export const MediaButton = (props: MediaButtonProps) => (
	<div
		style={{
			display: "flex",
			width: "35px",
			height: "35px",
			"background-color": props.color,
			"border-radius": "6px",
			margin: "2px",
			cursor: "pointer",
			"user-select": "none",
			transition: "0.1s",
		}}
		onClick={props.click}
		title={props.title}
	>
		{props.children}
	</div>
);
