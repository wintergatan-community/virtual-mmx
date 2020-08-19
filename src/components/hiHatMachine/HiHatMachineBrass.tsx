import React from "react";

export const HiHatMachineBrass = (props: { angle: number }) => (
	<svg
		viewBox="-40 -40 80 80"
		style={{
			width: "100%",
			position: "absolute",
			marginTop: "-50%",
			top: "19px",
			zIndex: 0,
		}}
	>
		<path
			transform={`rotate(${props.angle}) translate(-50, -50) `}
			d="M 50.962874,80.974809 C 66.570132,80.32701 80.732317,67.729803 81.36946,50.174835 81.4487,45.52458 80.577247,42.701361 80.284067,41.823721 80.003109,40.996956 79.741882,40.99008 79.015171,41.147282 c -0.427934,0.11944 -1.355575,0.22758 -3.030245,0.632335 -0.805962,0.169913 -1.313093,-0.191777 -1.507749,-0.619836 -2.901573,-7.84034 -9.360088,-13.073894 -15.772048,-15.508405 -0.55399,-0.197691 -1.339196,-0.886677 -1.487964,-1.535484 -0.214999,-1.201111 -0.345998,-2.220601 -0.49569,-3.419993 -0.07526,-0.747984 -0.389909,-0.973901 -1.07795,-1.044415 -3.409879,-0.40418 -7.837443,-0.32404 -11.162525,0.0792 -0.64978,0.09203 -1.110496,0.28582 -1.13002,1.051037 -0.126192,0.999773 -0.210554,1.956258 -0.385843,3.486189 -0.101324,0.711276 -0.837256,1.241851 -1.319861,1.400545 -6.387352,2.064957 -12.688863,6.654404 -16.122335,15.720132 -0.310826,0.659521 -0.683004,0.885857 -1.538707,0.7203 -0.823292,-0.178889 -1.886281,-0.43313 -2.722414,-0.616051 -0.870133,-0.179496 -1.081829,-0.194321 -1.357085,0.636298 0,0 -1.352378,3.643245 -1.21971,8.651731 0.45348,16.689087 14.718886,30.317488 32.277849,30.19394 z"
			strokeWidth="1"
			fill="rgb(253, 227, 165)"
			stroke="rgb(209, 179, 107)"
		/>
	</svg>
);