import { For } from "solid-js";
import { Signal, signal } from "../../core/helpers/solid";
import { mapArrayToObj } from "../../core/helpers/functions";

import { HiHatMachineMode } from "../../toFutureSchema";

import beat from "./modeIcons/beat.min.svg";
import offbeat from "./modeIcons/offbeat.min.svg";
import sixteenth from "./modeIcons/sixteenth.min.svg";
import triplet from "./modeIcons/triplet.min.svg";
import dot from "./modeIcons/dot.min.svg";

const modeOptionIcon: Record<HiHatMachineMode, any> = {
	beat: beat,
	beatAndOffbeat: dot,
	offbeat: offbeat,
	offbeatAndSixteenth: dot,
	sixteenth: sixteenth,
	sixteenthAndTriplet: dot,
	triplet: triplet,
	off: null,
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

interface ModeSelectorProps {
	currentMode: Signal<HiHatMachineMode>;
	selectMode: (mode: HiHatMachineMode) => void;
}

export const ModeSelector = (props: ModeSelectorProps) => {
	const currentHover = signal<HoverState>(null);
	const mouseDown = signal(false);

	const activeHighlighted = () => getHighlightsFromMode(props.currentMode());
	const hoverHighlighted = () => getHighlightsFromMode(currentHover());

	function hover(state: HoverState) {
		currentHover(state);
		// This is still a little quirky, halp
		// (Press down, move out, come back. Releasing triggers a click but it isn't
		//  shown darker.)
		mouseDown(false);
	}

	function press(down: boolean) {
		mouseDown(down);
	}

	return (
		<div
			onMouseDown={() => press(true)}
			onMouseUp={() => press(false)}
			style={{
				// TODO: Prefixing?
				"user-select": "none",
				display: "flex",
				"flex-direction": "column",
				"align-items": "center",
			}}
		>
			<div
				style={{
					display: "flex",
					background: "white",
					"border-radius": "100vmax",
					"box-shadow": "0 0 4px rgba(0,0,0,40%)",
					padding: "3px",
					// Be above the off button _and_ start a new stacking context
					// for highlights
					"z-index": 2,
					position: "relative",
				}}
			>
				<For each={optionOrder}>
					{(mode) => (
						<Option
							mode={mode}
							position={getPositionFromMode(mode)}
							active={activeHighlighted()[mode]}
							hover={hoverHighlighted()[mode]}
							onClick={props.selectMode}
							onHoverChange={hover}
							mouseDown={mouseDown()}
						/>
					)}
				</For>
			</div>
			<OffOption
				active={props.currentMode() === "off"}
				hover={currentHover() === "off"}
				onClick={props.selectMode}
				onHoverChange={hover}
			/>
		</div>
	);
};

interface OptionProps {
	mode: HiHatMachineMode;
	position: OptionPosition;
	active: HighlightState | false;
	hover: HighlightState | false;
	onClick: (mode: HiHatMachineMode) => void;
	onHoverChange: (mode: HoverState) => void;
	mouseDown: boolean;
}

const Option = (props: OptionProps) => {
	const style: JSX.CSSProperties = {
		display: "flex",
		position: "relative",
		padding: "0px",
		cursor: "pointer",
	};

	return (
		<div
			onClick={() => props.onClick(props.mode)}
			onMouseEnter={() => props.onHoverChange(props.mode)}
			onMouseLeave={() => props.onHoverChange(null)}
			style={style}
		>
			{/* Height should be 30px by default but scalable from the ModeSelector.
      TODO: Refactor the units. */}
			<img
				src={modeOptionIcon[props.mode]}
				style={{ width: "100%" }}
				draggable={false}
			/>
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
};

interface OptionHighlightProps {
	zIndex: number;
	color: string;
	position: OptionPosition;
	highlightPosition: HighlightState;
}

const OptionHighlight = (props: OptionHighlightProps) => {
	const highlightEdgeRadius = "3px", // can't do % here, so just something sensible
		panelEdgeRadius = "16px";
	let leftRadius = "0";
	let rightRadius = "0";
	if (
		props.highlightPosition === "left" ||
		props.highlightPosition === "bothSides"
	) {
		leftRadius = highlightEdgeRadius;
	}
	if (
		props.highlightPosition === "right" ||
		props.highlightPosition === "bothSides"
	) {
		rightRadius = highlightEdgeRadius;
	}
	if (props.position === "left") {
		leftRadius = panelEdgeRadius;
	}
	if (props.position === "right") {
		rightRadius = panelEdgeRadius;
	}
	const style: JSX.CSSProperties = {
		position: "absolute",
		top: "0px",
		bottom: "0px",
		left: "0px",
		right: "0px",
		"pointer-events": "none",
		"z-index": props.zIndex,
		"background-color": props.color,
		"border-radius": `${leftRadius} ${rightRadius} ${rightRadius} ${leftRadius}`,
	};
	return <div style={style} />;
};

interface OffOptionProps {
	active: boolean;
	hover: boolean;
	onClick: (mode: HiHatMachineMode) => void;
	onHoverChange: (mode: HoverState) => void;
}

const OffOption = (props: OffOptionProps) => {
	const style: JSX.CSSProperties = {
		display: "inline-block",
		"background-color": "#f8f8f8",
		"line-height": "1.6em",
		padding: "0 0.5em",
		"box-shadow": "0 0 4px rgba(0,0,0,30%)",
		"border-radius": "0 0 0.4em 0.4em",
		cursor: "pointer",
		// Be above HiHatMachineBrass
		"z-index": 1,
	};
	if (props.hover) {
		style.backgroundColor = "#f1f1f1";
	}
	if (props.active) {
		style.backgroundColor = "#6bb6fd";
	}
	return (
		<div
			onClick={() => props.onClick("off")}
			onMouseEnter={() => props.onHoverChange("off")}
			onMouseLeave={() => props.onHoverChange(null)}
			style={style}
		>
			OFF
		</div>
	);
};

function getHighlightsFromMode(mode: HiHatMachineMode | null) {
	const highlighted = mapArrayToObj<HiHatMachineMode, HighlightState | false>(
		optionOrder,
		() => false
	);
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
