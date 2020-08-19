import React from "react";

export const VmmxHeader = (props: { headerPercent: number }) => {
	return (
		<div
			style={{
				display: "flex",
				width: "100%",
				height: `${props.headerPercent}%`,
				backgroundColor: "#ccc",
				alignItems: "center",
			}}
		>
			<p
				style={{
					fontSize: 25,
					paddingLeft: 20,
					paddingRight: 20,
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
			height: "80%",
			fontSize: 22,
			paddingLeft: 20,
			paddingRight: 20,
			color: "#434343",
			cursor: "pointer",
		}}
	>
		{props.text}
	</div>
);

const NavButtonBreak = () => (
	<span style={{ width: 1.5, height: "80%", backgroundColor: "#b7b7b7" }} />
);
