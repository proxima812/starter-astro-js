import {
	GrainGradient,
	LiquidMetal,
	MeshGradient,
	Warp,
} from "@paper-design/shaders-react"

function Gradient({ type = "warp", style = { width: 1200, height: 320 }, ...props }) {
	const defaultProps =
		type === "grain"
			? {
					colors: ["#0cc61b", "#fff", "#eb3333"],
					distortion: 1,
					swirl: 0.8,
					speed: 0.5,
			  }
			: type === "mesh"
			? {
					colors: ["#ffad0a", "#6200ff", "#e2a3ff", "#ff99fd"],
					positions: 2,
					wavex: 1.0,
					wavexshift: 0.6,
					wavey: 1.0,
					waveyshift: 0.21,
					mixing: 0.93,
					grainmixer: 0.0,
					grainoverride: 0.0,
					scale: 1.0,
					rotation: 0,
					offsetx: 0.0,
					offsety: 0.0,
					speed: 1.5,
			  }
			: type === "liquid"
			? {
					colorBack: "#00042e",
					colorTint: "#5b4dc7",
					repetition: 4.0,
					softness: 0.45,
					shiftRed: -0.5,
					shiftBlue: -1.0,
					distortion: 0.1,
					contour: 1,
					shape: "metaballs",
					speed: 1.0,
					scale: 2.2,
					rotation: 0,
					offsetx: 0.0,
					offsety: 0.0,
					fit: "contain",
					worldWidth: 1000,
					worldHeight: 500,
					originx: 0.5,
					originy: 0.5,
			  }
			: {
					colors: ["#fff", "#2c28a4", "#fff"],
					distortion: 0.2,
					proportion: 0.3,
					softness: 1,
					swirl: 0.86,
					swirlIterations: 7,
					shape: "checks",
					shapeScale: 0,
					scale: 0.8,
					rotation: 190,
					offsetx: 0.3,
					offsety: 0,
					speed: 2,
			  }

	const combinedProps = { ...defaultProps, ...props, style }

	if (type === "grain") {
		return <GrainGradient {...combinedProps} />
	}
	if (type === "mesh") {
		return <MeshGradient {...combinedProps} />
	}
	if (type === "liquid") {
		return <LiquidMetal {...combinedProps} />
	}

	return <Warp {...combinedProps} />
}

export default Gradient
