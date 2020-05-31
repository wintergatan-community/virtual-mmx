import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";
import { Peg } from "./Peg";
import { ToneDropEvent } from "../../core/playback/events";

export const Pegs = observer(() => {
	const { global, editor } = useStores();
	const store = useLocalStore(() => ({
		get visibleStartTick() {
			return 0; // TODO correctly
		},
		get visibleEndTick() {
			return editor.tickDivisions[editor.tickDivisions.length - 1]; // TODO out of bounds
		},
	}));

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
		(source) => ({
			// TODO fix for other instruments
			// if (event.dropEvent.kind !== "vibraphone") return null;
			get tick() {
				return source.event.dropEvent.tick;
			},
			get visible() {
				return (
					store.tick < source.visibleEndTick ||
					store.tick > source.visibleStartTick
				); // TODO optimize / work correctly
			},
			removePeg() {
				global.removeDropEvent(source.event);
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
