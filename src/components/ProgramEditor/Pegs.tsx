import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";
import { Peg } from "./Peg";
import { ToneDropEvent } from "../../core/playback/events";

export const Pegs = observer(() => {
	const { global } = useStores();

	return (
		<>
			{global.dropEvents.map((event) => (
				<MaybeRenderedPeg event={event} key={event.id} />
			))}
		</>
	);
});

interface MaybeRenderedPegProps {
	event: ToneDropEvent;
}

export const MaybeRenderedPeg = observer((props: MaybeRenderedPegProps) => {
	const { wheel, global } = useStores();
	const store = useLocalStore(
		(source) => ({
			// TODO fix for other instruments
			get tick() {
				return source.event.dropEvent.tick;
			},
			get visible() {
				return (
					store.tick > wheel.visibleTopTick ||
					store.tick < wheel.visibleBottomTick
				);
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
			activeDivision={store.tick % wheel.ticksPerNoteSubdivision === 0}
			spawnsEvent={true}
			click={store.removePeg}
			key={props.event.id}
		/>
	) : null;
});
