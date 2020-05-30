import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";
import { Peg } from "./Peg";
import { ToneDropEvent } from "../../core/playback/events";

interface PegsProps {
	tickDivisions: number[];
}

export const Pegs = observer((props: PegsProps) => {
	const { global } = useStores();
	const store = useLocalStore(
		(source) => ({
			get visibleStartTick() {
				return 0; // TODO correctly
			},
			get visibleEndTick() {
				return source.tickDivisions[source.tickDivisions.length - 1]; // TODO out of bounds
			},
		}),
		props
	);

	return (
		<>
			{global.dropEvents.map((event) => (
				<MaybeRenderedPeg
					event={event}
					visibleStartTick={store.visibleStartTick}
					visibleEndTick={store.visibleEndTick}
					key={event.id}
				/>
			))}
		</>
	);
});

interface MaybeRenderedPegProps {
	event: ToneDropEvent;
	visibleStartTick: number;
	visibleEndTick: number;
}

export const MaybeRenderedPeg = observer((props: MaybeRenderedPegProps) => {
	const { editor, global } = useStores();
	const store = useLocalStore(
		(s) => ({
			// TODO fix for other instruments
			// if (event.dropEvent.kind !== "vibraphone") return null;
			get tick() {
				return s.event.dropEvent.tick;
			},
			get visible() {
				return store.tick < s.visibleEndTick || store.tick > s.visibleStartTick; // TODO optimize / work correctly
			},
			removePeg() {
				// TODO optimize for mutability
				let newTickedDropEvents = global.dropEvents.filter(
					(e) => e !== s.event
				);
				global.player.removeDropEvent(s.event);
				console.log("removed " + s.event.id);
				global.dropEvents = newTickedDropEvents; // TODO should be action, use mutation
			},
		}),
		props
	);

	return store.visible ? (
		<Peg
			toneDropEvent={props.event}
			activeDivision={store.tick % editor.ticksPerNoteSubdivision === 0}
			spawnsEvent={true}
			click={store.removePeg}
			key={props.event.id}
		/>
	) : null;
});
