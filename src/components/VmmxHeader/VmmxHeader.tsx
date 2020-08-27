export const VmmxHeader = (props: { headerPercent: number }) => {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: `${props.headerPercent}%`,
				"background-color": "#ccc",
				"align-items": "center",
			}}
		>
			<p
				style={{
					"font-size": "25px",
					"padding-left": "20px",
					"padding-right": "20px",
				}}
			>
				Virtual Marble Machine X
			</p>
			<NavButtonBreak />
			<NavButton text="Share" />
			<NavButtonBreak />
			<NavButton text="View" />
			<NavButtonBreak />
		</div>
	);
};

interface NavButtonProps {
	text: string;
}

const NavButton = (props: NavButtonProps) => (
	<div
		style={{
			display: "flex",
			height: "80%",
			"font-size": "22px",
			"padding-left": "20px",
			"padding-right": "20px",
			color: "#434343",
			cursor: "pointer",
			"align-items": "center",
		}}
	>
		{props.text}
	</div>
);

const NavButtonBreak = () => (
	<span
		style={{ width: "1.5px", height: "80%", "background-color": "#b7b7b7" }}
	/>
);
