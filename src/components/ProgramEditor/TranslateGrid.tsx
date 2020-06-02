import React from "react";
import { SomeReactChildren } from "../../core/types";
import { useLocalStore, observer } from "mobx-react";
import { useStores } from "../../contexts/StoreContext";

interface TranslateProps {
	children: SomeReactChildren;
	tick?: number;
	channel?: number;
}

export const TranslateGrid = observer((props: TranslateProps) => {
	const { wheel } = useStores();
	const store = useLocalStore(
		(source) => ({
			get x() {
				return wheel.channelToPixel(source.channel ?? 0);
			},
			get y() {
				return wheel.tickToPixel(source.tick ?? 0);
			},
		}),
		props
	);
	return (
		<g style={{ transform: `translate(${store.x}px, ${store.y}px)` }}>
			{props.children}
		</g>
	);
});
