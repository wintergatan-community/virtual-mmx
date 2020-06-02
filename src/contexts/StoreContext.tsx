import { createContext, useContext } from "react";
import { GlobalStore } from "./globalStore";
import { ProgrammingWheelStore } from "./wheelStore";
import { BassString, VibraphoneChannel } from "vmmx-schema";

const global = new GlobalStore();
export { global };
const wheel = new ProgrammingWheelStore(global); // needs reference to global store
export { wheel };

export const storesContext = createContext({ global, wheel });

export const useStores = () => useContext(storesContext);

// TODO move this garbage out of here
for (let i = 1; i <= 11; i++) {
	global.program.dropEvents.push({
		kind: "vibraphone",
		channel: i as VibraphoneChannel,
		tick: (i - 1) * (global.program.metadata.tpq / 2),
	});
}
for (let i = 1; i <= 4; i++) {
	global.program.dropEvents.push({
		kind: "bass",
		string: i as BassString,
		fret: 0,
		tick: (i - 1 + 11) * (global.program.metadata.tpq / 2),
	});
}
// global.player.tempLoad();

// just a handy template
/*
export const  = observer((props: ) => {
	const { editor } = useStores();
	const store = useLocalStore(
		(s) => ({

		}),
		props
	);
	return (

	);
});
*/

// probably dont need any of this... it'll stay just to be safe. for now

// const [GlobalContext, GlobalContextProvider, globalStore] = makeContext(
// 	createGlobalStore
// );
// const [EditorContext, EditorContextProvider] = makeContext(() =>
// 	createEditorStore(globalStore)
// );

// export default {
// 	GlobalContext,
// 	GlobalContextProvider,
// 	EditorContext,
// 	EditorContextProvider,
// };

// type MakeContextResult<T> = [
// 	React.Context<T>, // context
// 	({ children }: { children: SomeReactChildren }) => JSX.Element, // provider
// 	T // store
// ];

// function makeContext<T>(storeBuilder: () => T): MakeContextResult<T> {
// 	const store = observable.object(storeBuilder());
// 	const Context = React.createContext(store);
// 	return [
// 		Context,
// 		({ children }: { children: SomeReactChildren }) => {
// 			return <Context.Provider value={store}>{children}</Context.Provider>;
// 		},
// 		store,
// 	];
// }
