import React from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import CSS from "csstype";

import { HiHatMachineMode } from "./HiHatMachine";

// TODO: svg / ensure font actually supports these (though the triplet icon does need to change)
const modeOptionIcon: { [mode in HiHatMachineMode]: string } = {
	beat: "𝅘𝅥 \xa0",
	beatAndOffbeat: "•",
	offbeat: "𝄾 𝅘𝅥𝅮  \xa0",
	offbeatAndSixteenth: "•",
	sixteenth: "𝅘𝅥𝅯  \xa0",
	sixteenthAndTriplet: "•",
	triplet: "𝅘𝅥 𝅘𝅥 𝅘𝅥 \xa0",
	off: "",
};

const optionOrder: HiHatMachineMode[] = [
	"beat",
	"beatAndOffbeat",
	"offbeat",
	"offbeatAndSixteenth",
	"sixteenth",
	"sixteenthAndTriplet",
	"triplet",
];

type OptionPosition = "left" | "middle" | "right";
type HighlightState = OptionPosition | "bothSides";
type HoverState = HiHatMachineMode | null;

interface Props {
	currentMode: HiHatMachineMode;
	selectMode: (mode: HiHatMachineMode) => void;
}
@observer
export class ModeSelector extends React.Component<Props> {
	@observable currentHover: HoverState = null;
	@observable mouseDown = false;

	@computed get activeHighlighted() {
		return getHighlightsFromMode(this.props.currentMode);
	}

	@computed get hoverHighlighted() {
		return getHighlightsFromMode(this.currentHover);
	}

	@action.bound hover(state: HoverState) {
		this.currentHover = state;
		// This is still a little quirky, halp
		// (Press down, move out, come back. Releasing triggers a click but it isn't
		//  shown darker.)
		this.mouseDown = false;
	}

	@action.bound press(down: boolean) {
		this.mouseDown = down;
	}

	render() {
		return (
			<div
				onMouseDown={this.press.bind(null, true)}
				onMouseUp={this.press.bind(null, false)}
				style={{
					// TODO: Prefixing?
					userSelect: "none",
					textAlign: "center",
				}}
			>
				<div
					style={{
						fontSize: "22px",
						background: "white",
						borderRadius: "2em",
						boxShadow: "0 0 4px rgba(0,0,0,40%)",
						padding: "3px",
						// Be above the off button _and_ start a new stacking context
						// for highlights
						zIndex: 1,
						position: "relative",
					}}
				>
					{optionOrder.map((mode) => (
						<Option
							mode={mode}
							position={getPositionFromMode(mode)}
							active={this.activeHighlighted[mode]}
							hover={this.hoverHighlighted[mode]}
							onClick={this.props.selectMode}
							onHoverChange={this.hover}
							mouseDown={this.mouseDown}
							key={mode}
						/>
					))}
				</div>
				<OffOption
					active={this.props.currentMode === "off"}
					hover={this.currentHover === "off"}
					onClick={this.props.selectMode}
					onHoverChange={this.hover}
				/>
			</div>
		);
	}
}

const Option = observer(function (props: {
	mode: HiHatMachineMode;
	position: OptionPosition;
	active: HighlightState | false;
	hover: HighlightState | false;
	onClick: (mode: HiHatMachineMode) => void;
	onHoverChange: (mode: HoverState) => void;
	mouseDown: boolean;
}) {
	const style: CSS.Properties = {
		display: "inline-block",
		position: "relative",
		lineHeight: "1.6em",
		padding: "0 0.2em",
		cursor: "pointer",
	};
	// TODO: This should happen in the icon svgs or be in modeOptionIcon as an additional field
	// The props.position=== below are also icon-dependent
	if (
		["beatAndOffbeat", "offbeatAndSixteenth", "sixteenthAndTriplet"].includes(
			props.mode
		)
	) {
		style.padding = "0 0.4em";
	}
	if (props.position === "left") {
		style.paddingLeft = "0.6em";
	}
	if (props.position === "right") {
		style.paddingRight = "0.3em";
	}
	return (
		<div
			onClick={props.onClick.bind(null, props.mode)}
			onMouseEnter={props.onHoverChange.bind(null, props.mode)}
			onMouseLeave={props.onHoverChange.bind(null, null)}
			style={style}
		>
			{modeOptionIcon[props.mode]}
			{props.active && (
				<OptionHighlight
					zIndex={-2}
					color="#6bb6fd"
					position={props.position}
					highlightPosition={props.active}
				/>
			)}
			{props.hover && (
				<OptionHighlight
					zIndex={-1}
					color={props.mouseDown ? "rgba(0,0,0,15%)" : "rgba(0,0,0,10%)"}
					position={props.position}
					highlightPosition={props.hover}
				/>
			)}
		</div>
	);
});

const OptionHighlight = observer(function (props: {
	zIndex: number;
	color: string;
	position: OptionPosition;
	highlightPosition: HighlightState;
}) {
	const highlightEdgeRadius = "0.15em",
		panelEdgeRadius = "1em";
	let leftRadius = "0";
	let rightRadius = "0";
	let leftExpand = false;
	let rightExpand = false;
	if (
		props.highlightPosition === "left" ||
		props.highlightPosition === "bothSides"
	) {
		leftRadius = highlightEdgeRadius;
		leftExpand = true;
	}
	if (
		props.highlightPosition === "right" ||
		props.highlightPosition === "bothSides"
	) {
		rightRadius = highlightEdgeRadius;
		rightExpand = true;
	}
	if (props.position === "left") {
		leftRadius = panelEdgeRadius;
		leftExpand = false;
	}
	if (props.position === "right") {
		rightRadius = panelEdgeRadius;
		rightExpand = false;
	}
	const style: CSS.Properties = {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: leftExpand ? "-0.2em" : 0,
		right: rightExpand ? "-0.2em" : 0,
		pointerEvents: "none",
		zIndex: props.zIndex,
		backgroundColor: props.color,
		borderRadius: `${leftRadius} ${rightRadius} ${rightRadius} ${leftRadius}`,
	};
	return <div style={style} />;
});

const OffOption = observer(function (props: {
	active: boolean;
	hover: boolean;
	onClick: (mode: HiHatMachineMode) => void;
	onHoverChange: (mode: HoverState) => void;
}) {
	const style: CSS.Properties = {
		display: "inline-block",
		backgroundColor: "#f8f8f8",
		lineHeight: "1.6em",
		padding: "0.2em 0.5em 0",
		boxShadow: "0 0 4px rgba(0,0,0,30%)",
		borderRadius: "0 0 0.4em 0.4em",
		cursor: "pointer",
	};
	if (props.hover) {
		style.backgroundColor = "#f1f1f1";
	}
	if (props.active) {
		style.backgroundColor = "#6bb6fd";
	}
	return (
		<div
			onClick={props.onClick.bind(null, "off")}
			onMouseEnter={props.onHoverChange.bind(null, "off")}
			onMouseLeave={props.onHoverChange.bind(null, null)}
			style={style}
		>
			OFF
		</div>
	);
});

function getHighlightsFromMode(mode: HiHatMachineMode | null) {
	const highlighted = Object.fromEntries(
		optionOrder.map((mode) => [mode, false])
	) as { [mode in HiHatMachineMode]: HighlightState | false };
	if (mode === "beatAndOffbeat") {
		highlighted.beat = "left";
		highlighted.beatAndOffbeat = "middle";
		highlighted.offbeat = "right";
	} else if (mode === "offbeatAndSixteenth") {
		highlighted.offbeat = "left";
		highlighted.offbeatAndSixteenth = "middle";
		highlighted.sixteenth = "right";
	} else if (mode === "sixteenthAndTriplet") {
		highlighted.sixteenth = "left";
		highlighted.sixteenthAndTriplet = "middle";
		highlighted.triplet = "right";
	} else if (mode && mode !== "off") {
		highlighted[mode] = "bothSides";
	}
	return highlighted;
}

function getPositionFromMode(mode: HiHatMachineMode): OptionPosition {
	switch (mode) {
		case optionOrder[0]:
			return "left";
		case optionOrder[optionOrder.length - 1]:
			return "right";
		default:
			return "middle";
	}
}
