import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export function PortfolioShaderBackground() {
	return (
		<div className="shader-canvas" aria-hidden>
			<ShaderGradientCanvas
				style={{ position: "absolute", inset: 0 }}
				pixelDensity={1}
				fov={45}
			>
				<ShaderGradient
					animate="on"
					brightness={0.6}
					cAzimuthAngle={180}
					cDistance={3.6}
					cPolarAngle={90}
					color1="#1a3c2a"
					color2="#d4e8db"
					color3="#2f7d52"
					envPreset="city"
					grain="on"
					lightType="3d"
					positionX={-1.4}
					positionY={0}
					positionZ={0}
					reflection={0.1}
					rotationX={0}
					rotationY={10}
					rotationZ={50}
					shader="defaults"
					type="plane"
					uAmplitude={1}
					uDensity={1.3}
					uFrequency={5.5}
					uSpeed={0.4}
					uStrength={4}
				/>
			</ShaderGradientCanvas>
		</div>
	);
}
