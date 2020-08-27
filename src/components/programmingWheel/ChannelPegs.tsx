import { Peg } from "./Peg";
import {
	VibraphoneDropE,
	DropEventTimeline,
	DropE,
} from "../../core/eventTimelines/concrete";
import { For, useContext, createEffect } from "solid-js";
import { Signal } from "../../core/helpers/solid";
import { ProgrammingWheelContext } from "./ProgrammingWheel";
import { TranslateOnScroll } from "../Scroll";

interface ChannelPegsProps {
	timeline: DropEventTimeline<VibraphoneDropE>;
}

export const ChannelPegs = (props: ChannelPegsProps) => {
	const { scroll } = useContext(ProgrammingWheelContext);
	// const visiblePegs = scroll.y.visibleArrayOf(props.timeline.events, (e) =>
	// 	e ? e.tick() : 0
	// );

	return (
		<>
			<For each={props.timeline.events()}>
				{(peg) => (
					<MaybeRenderedPeg pegTick={peg.tick} timeline={props.timeline} />
				)}
			</For>
			<TranslateOnScroll scroll={scroll} axis="y" by={scroll.y.total}>
				<For each={props.timeline.events()}>
					{(peg) => (
						<MaybeRenderedPeg pegTick={peg.tick} timeline={props.timeline} />
					)}
				</For>
			</TranslateOnScroll>
		</>
	);
};

interface MaybeRenderedPegProps {
	pegTick: Signal<number>;
	timeline: DropEventTimeline<DropE>;
}

export const MaybeRenderedPeg = (props: MaybeRenderedPegProps) => {
	const { wheel, scroll } = useContext(ProgrammingWheelContext);

	function removePeg() {
		const t = props.timeline;
		const event = t.events().find((e) => e.tick() === props.pegTick());
		if (!event) return;
		const difs = t.getRemoveDifs(event);
		if (!difs) return;
		t.applyDifs(difs);
	}
	function activeDivision() {
		return props.pegTick() % wheel.ticksPerNoteSubdivision() === 0;
	}

	return (
		<TranslateOnScroll scroll={scroll} axis="y" by={props.pegTick}>
			<Peg
				pegTick={props.pegTick}
				activeDivision={activeDivision()}
				spawnsEvent={true}
				click={removePeg}
			/>
		</TranslateOnScroll>
	);
};
