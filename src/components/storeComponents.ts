import { Component } from "react";
import { inject, observer } from "mobx-react";
import { AppStore } from "../stores/app";
import { IReactComponent } from "mobx-react/dist/types/IReactComponent";
import { ProgrammingWheelDisplayStore } from "./programmingWheel/programmingWheelDisplay";
import { VibraphoneDisplayStore } from "./vibraphone/Vibraphone";
import { DrumsDisplayStore } from "./drums/drumsDisplay";
import { BassDisplayStore } from "./bass/bassDisplay";

// this is likely bad, but the following "better" solutions were equally depressing
// https://medium.com/@prashaantt/strongly-typing-injected-react-props-635a6828acaf
// https://github.com/mobxjs/mobx-react/issues/256

// Aaaaaand intellisense is broken because of bad types... great

export class AppComponent<Props = Record<string, unknown>> extends Component<
	Props
> {
	get app() {
		const store = ((this.props as unknown) as { app: AppStore }).app;
		if (!store)
			throw new Error(
				"App component was either not nested under provider or you're using the dumb component"
			);
		return store;
	}

	protected static inject(Comp: IReactComponent, toInject: string[]) {
		return inject(...toInject, "app")(observer(Comp));
	}

	static sync<P>(Comp: IReactComponent<P>) {
		return this.inject(Comp, []) as IReactComponent<P>;
	}
}

export class VibraphoneComponent<
	Props = Record<string, unknown>
> extends AppComponent<Props> {
	get vibra() {
		const store = ((this.props as unknown) as {
			vibra: VibraphoneDisplayStore;
		}).vibra;
		if (!store)
			throw new Error(
				"Vibraphone component was either not nested under provider or you're using the dumb component"
			);
		return store;
	}

	protected static inject(Comp: IReactComponent, toInject: string[]) {
		return super.inject(Comp, [...toInject, "vibra"]);
	}

	static sync<P>(Comp: IReactComponent<P>) {
		return this.inject(Comp, []) as IReactComponent<P>;
	}
}

export class DrumsComponent<
	Props = Record<string, unknown>
> extends AppComponent<Props> {
	get drums() {
		const store = ((this.props as unknown) as { drums: DrumsDisplayStore })
			.drums;
		if (!store)
			throw new Error(
				"Drums component was either not nested under provider or you're using the dumb component"
			);
		return store;
	}

	protected static inject(Comp: IReactComponent, toInject: string[]) {
		return super.inject(Comp, [...toInject, "drums"]);
	}

	static sync<P>(Comp: IReactComponent<P>) {
		return this.inject(Comp, []) as IReactComponent<P>;
	}
}

export class WheelComponent<
	Props = Record<string, unknown>
> extends AppComponent<Props> {
	get wheel() {
		const store = ((this.props as unknown) as {
			wheel: ProgrammingWheelDisplayStore;
		}).wheel;
		if (!store)
			throw new Error(
				"Wheel component was either not nested under provider or you're using the dumb component"
			);
		return store;
	}

	protected static inject(Comp: IReactComponent, toInject: string[]) {
		return super.inject(Comp, [...toInject, "wheel"]);
	}

	static sync<P>(Comp: IReactComponent<P>) {
		return this.inject(Comp, []) as IReactComponent<P>;
	}
}

export class BassComponent<
	Props = Record<string, unknown>
> extends AppComponent<Props> {
	get bass() {
		const store = ((this.props as unknown) as { bass: BassDisplayStore }).bass;
		if (!store)
			throw new Error(
				"Bass component was either not nested under provider or you're using the dumb component"
			);
		return store;
	}

	protected static inject(Comp: IReactComponent, toInject: string[]) {
		return super.inject(Comp, [...toInject, "bass"]);
	}

	static sync<P>(Comp: IReactComponent<P>) {
		return this.inject(Comp, []) as IReactComponent<P>;
	}
}
