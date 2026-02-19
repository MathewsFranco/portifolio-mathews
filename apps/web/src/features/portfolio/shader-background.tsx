import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react";

export function PortfolioShaderBackground() {
	return (
		<div className="shader-canvas" aria-hidden>
			<ShaderGradientCanvas
				style={{
					position: "absolute",
					inset: 0,
					height: "100%",
					width: "100%",
				}}
			>
				<ShaderGradient
					animate="on"
					brightness={0.6}
					cAzimuthAngle={180}
					cDistance={3.6}
					cPolarAngle={90}
					cameraZoom={1}
					color1="#1a3c2a"
					color2="#d4e8db"
					color3="#2f7d52"
					envPreset="city"
					format="gif"
					fov={45}
					frameRate={10}
					gizmoHelper="hide"
					grain="on"
					lightType="3d"
					pixelDensity={1}
					positionX={-1.4}
					positionY={0}
					positionZ={0}
					range="disabled"
					rangeEnd={40}
					rangeStart={0}
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
					uTime={0}
					wireframe={false}
				/>
			</ShaderGradientCanvas>
		</div>
	);
}
