import React from "react";
import { observer, useLocalStore } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";
import { Peg } from "./Peg";

interface PegsProps {
	pegs: number[];
	channel: number;
}

export const ChannelPegs = observer((props: PegsProps) => {
	return (
		<>
			{props.pegs.map((pegTick) => (
				<MaybeRenderedPeg
					pegTick={pegTick}
					channel={props.channel}
					key={pegTick}
				/>
			))}
		</>
	);
});

interface MaybeRenderedPegProps {
	pegTick: number;
	channel: number;
}

export const MaybeRenderedPeg = observer((props: MaybeRenderedPegProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get partData() {
				return wheel.pegChannelDatas[source.channel].partData;
			},
			get tick() {
				return source.pegTick;
			},
			get visible() {
				return (
					store.tick > wheel.visibleTopTick ||
					store.tick < wheel.visibleBottomTick
				);
			},
			removePeg() {
				store.partData?.remove(store.tick);
			},
		}),
		props
	);

	return store.visible ? (
		<Peg
			pegTick={props.pegTick}
			channel={props.channel}
			activeDivision={props.pegTick % wheel.ticksPerNoteSubdivision === 0}
			spawnsEvent={true}
			click={store.removePeg}
			key={store.tick}
		/>
	) : null;
});
