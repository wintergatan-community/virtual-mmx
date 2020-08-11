import React, { Component } from "react";
import { computed } from "mobx";
import { mapValue } from "../../core/helpers/functions";
import { observer } from "mobx-react";

interface LabelAxisProps<T extends string | number> {
	labels: T[];
	children: ((label: T) => JSX.Element) | JSX.Element;
}

@observer
export class LabelAxis<T extends string | number> extends Component<
	LabelAxisProps<T>
> {
	@computed get scaledLabels() {
		const labels = this.props.labels;
		return labels.map((label, i) => ({
			label,
			fit: mapValue(i, 0, labels.length - 1, 20, 150 - 20), // TODO not fixed
		}));
	}

	@computed get childrenAsFunc() {
		if (this.props.children instanceof Function) {
			return this.props.children;
		}
		return null;
	}

	render() {
		return (
			<g>
				{this.scaledLabels.map(({ label, fit }) => (
					// <g transform={`translate(0, ${fit})`} key={label}>
					// 	<rect width={20} height={16} y={-8} fill="#b7b7b7" />
					// 	<text x={5} y={4} fill="black" fontSize={11}>
					// 		{label}
					// 	</text>
					// </g>
					<g transform={`translate(0, ${fit})`} key={label}>
						<line x2={2000} stroke="#b7b7b7" />
						{this.childrenAsFunc && this.childrenAsFunc(label)}
						<rect width={90} height={18} y={-9} x={-4} fill="#b7b7b7" rx={9} />
						<text x={10} fontSize={11} y={4} fill="#434343">
							{label}
						</text>
					</g>
				))}
				{!this.childrenAsFunc && this.props.children}
			</g>
		);
	}
}
