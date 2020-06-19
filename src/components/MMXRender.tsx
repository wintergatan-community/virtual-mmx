import React from "react";

export default function MMMXRender() {
	return <></>;
}

// just a prototype for the 3D render. holding off on uncommenting until dependencies are approved

// import React, { useRef, useState, useEffect, useContext } from 'react'
// import { Canvas, useFrame, extend, useThree } from 'react-three-fiber'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { Synth } from "tone";
// import { EditorContext, MarbleEvent } from '../EditorContext';

// extend({ OrbitControls })

// interface BallData {
//   fallen: number
//   velocity: number
//   channel: number
// }

// const synth = new Synth().toMaster()

// export default function MMXRender() {
//   const {marbleEvents} = useContext(EditorContext)
//   const [tick, setTick] = useState(0)
//   const [balls, setBalls] = useState<BallData[]>([])

//   useInterval(() => {
//     setTick((tick + 1) % 360)
//     let newBalls = balls.map(b => ({
//       ...b,
//       fallen: b.fallen + b.velocity,
//       velocity: b.velocity - 0.002
//     }) as BallData)

//     newBalls = newBalls.filter(b => b.fallen > -5)

//     for(let m of marbleEvents) {
//       if(Math.abs(m.tick - tick) < 0.01) {
//         newBalls.push({fallen: 0, velocity: 0, channel: m.channel})
//         synth.triggerAttackRelease((m.channel + 1) * 100, "80n")
//       }
//     }

//     setBalls(newBalls)
//   }, 1000/60)

//   return <div style={{width: 300, height: 300, border: '2px red solid'}}>
//     <Canvas>
//       <CameraControls/>
//       <ambientLight/>
//       <pointLight position={[10, 10, 10]}/>
//       <Wheel tick={tick} marbleEvents={marbleEvents}/>
//       <NoteLine/>
//       {
//         balls.map((b, i) => <Ball ball={b} key={i}/>)
//       }
//     </Canvas>
//   </div>
// }

// function Wheel({tick, marbleEvents}: {tick: number, marbleEvents: MarbleEvent[]}) {
//   // const {marbleEvents} = useContext(EditorContext)
//   const mesh = useRef<any>()

//   return <mesh
//     ref={mesh}
//     scale={[1, 1, 1]}
//     rotation={[Math.PI / 2, -tick * Math.PI / 180, 0]}>
//     <cylinderBufferGeometry attach='geometry' args={[1, 1, 2, 20]}/>
//     <meshStandardMaterial attach='material' color='orange'/>
//     {
//       marbleEvents.map((m, i) => <Peg {...m} key={i}/>)
//     }
//   </mesh>
// }

// const CameraControls = () => {
//   const {camera, gl: { domElement }} = useThree()
//   const controls = useRef<any>()
//   useFrame(() => controls.current.update())
//   return <orbitControls ref={controls} args={[camera, domElement]}/>
// }

// function Peg({tick, channel}: {tick: number, channel: number}) {
//   return <mesh
//     rotation={[0, tick * Math.PI / 180, 0]}>
//     <mesh
//       scale={[0.1, 0.1, 0.1]}
//       position={[1, channel / 20, 0]}>
//       <boxBufferGeometry attach='geometry' args={[1, 1, 1, 20]}/>
//       <meshStandardMaterial attach='material' color='gray'/>
//     </mesh>
//   </mesh>
// }

// function NoteLine() {
//   return <mesh
//     scale={[0.1, 0.1, 1.9]}
//     position={[1, 0, 0]}>
//     <boxBufferGeometry attach='geometry' args={[1, 1, 1]}/>
//     <meshStandardMaterial attach='material' color='red'/>
//   </mesh>
// }

// function Ball({ball}: {ball: BallData}) {
//   const ballRef = useRef<any>()

//   return <mesh
//     ref={ballRef}
//     scale={[2, 2, 2]}
//     position={[1, ball.fallen, ball.channel / 20]}>
//     <sphereBufferGeometry attach='geometry' args={[0.05]}/>
//     <meshStandardMaterial attach='material' color='rgb(80, 80, 80)'/>
//   </mesh>
// }

// function useInterval(callback: () => void, delay: number) {
//   const savedCallback = useRef(callback)

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current()
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay)
//       return () => clearInterval(id)
//     }
//   }, [delay])
// }

// // function Vibra({x}: {x: number}) {
// //   return <mesh
// //     scale={[1, 0.2, 0.2]}
// //     position={[1, -1.5, x]}>
// //     <boxBufferGeometry attach='geometry' args={[1, 1, 1]}/>
// //     <meshStandardMaterial attach='material' color='gray'/>
// //   </mesh>
// // }
