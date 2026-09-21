"use client";

import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function TideField() {
  const group = useRef<Group>(null);
  const positions = useMemo(() => {
    const points = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i += 1) {
      const progress = i / 1800;
      const turn = progress * Math.PI * 11;
      const radius = 1.15 + Math.sin(progress * Math.PI * 7) * 0.34;
      const band = ((i * 37) % 101) / 101 - 0.5;
      points[i * 3] = Math.cos(turn) * radius + band * 0.45;
      points[i * 3 + 1] = (progress - 0.5) * 4.8 + Math.sin(turn * 0.45) * 0.23;
      points[i * 3 + 2] = Math.sin(turn) * radius + Math.cos(i * 0.13) * 0.18;
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045;
    group.current.rotation.x += (state.pointer.y * 0.11 - group.current.rotation.x) * 0.035;
    group.current.rotation.z += (-state.pointer.x * 0.09 - group.current.rotation.z) * 0.035;
    group.current.position.x += (state.pointer.x * 0.22 - group.current.position.x) * 0.025;
  });

  return (
    <group ref={group} rotation={[0.35, 0, -0.42]}>
      <Points positions={positions} stride={3} frustumCulled>
        <PointMaterial transparent color="#54e8d5" size={0.018} sizeAttenuation depthWrite={false} opacity={0.78} />
      </Points>
    </group>
  );
}

export default function TideCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 46 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
      <fog attach="fog" args={["#071a26", 3.8, 8]} />
      <TideField />
    </Canvas>
  );
}

