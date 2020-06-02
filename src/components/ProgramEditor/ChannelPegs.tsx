import React from "react";
import { useStores } from "../../contexts/StoreContext";
import { observer, useLocalStore } from "mobx-react";
import { Peg } from "./Peg";
import { PegInPart } from "../../core/playback/partData";

interface PegsProps {
	pegs: PegInPart[];
	channel: number;
}

export const ChannelPegs = observer((props: PegsProps) => {
	return (
		<>
			{props.pegs.map((peg) => (
				<MaybeRenderedPeg peg={peg} channel={props.channel} key={peg.tick} />
			))}
		</>
	);
});

interface MaybeRenderedPegProps {
	peg: PegInPart;
	channel: number;
}

export const MaybeRenderedPeg = observer((props: MaybeRenderedPegProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get partData() {
				return wheel.partDatas[source.channel];
			},
			get tick() {
				return source.peg.tick;
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
			peg={props.peg}
			channel={props.channel}
			activeDivision={props.peg.tick % wheel.ticksPerNoteSubdivision === 0}
			spawnsEvent={true}
			click={store.removePeg}
			key={store.tick}
		/>
	) : null;
});
