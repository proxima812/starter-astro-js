import { Warp } from "@paper-design/shaders-react"

function Gradient() {
	return (
		<>
			{/* <GrainGradient
				colors={["#0cc61b", "#fff", "#eb3333"]}
				distortion={1}
				swirl={0.8}
				speed={0.5}
				style={{ width: 1200, height: 250 }}
			/> */}
			<Warp
				colors={["#fff", "#2c28a4", "#fff"]}
				distortion={0.2}
				proportion={0.3}
				softness={1}
				swirl={0.86}
				swirlIterations={7}
				shape="checks"
				shapeScale={0}
				scale={0.8}
				rotation={190}
				offsetX={0.3}
				offsetY={0}
				speed={2}
				style={{ width: 1200, height: 250 }}
			/>
		</>
	)
}

export default Gradient
