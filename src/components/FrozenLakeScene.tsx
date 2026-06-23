"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SnowPoints() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(360);
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 12;
      values[index + 1] = Math.random() * 7;
      values[index + 2] = (Math.random() - 0.5) * 8;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.05;
      points.current.position.y = Math.sin(Date.now() * 0.0006) * 0.12;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.035} transparent opacity={0.85} />
    </points>
  );
}

function Lake() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.015;
    }
  });

  return (
    <mesh ref={mesh} position={[0, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 8, 24, 24]} />
      <meshBasicMaterial color="#dcecff" transparent opacity={0.72} side={THREE.DoubleSide} wireframe />
    </mesh>
  );
}

export function FrozenLakeScene() {
  return (
    <Canvas camera={{ position: [0, 1.1, 5.8], fov: 52 }}>
      <color attach="background" args={["#071221"]} />
      <ambientLight intensity={1.1} />
      <SnowPoints />
      <Lake />
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.72, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.11} wireframe />
      </mesh>
    </Canvas>
  );
}
