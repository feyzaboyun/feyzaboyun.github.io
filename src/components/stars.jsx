import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader material for round stars with sparkle
const StarMaterial = () => {
  const vertexShader = `
    attribute float size;
    attribute float alpha;
    varying float vAlpha;
    void main() {
      vAlpha = alpha;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z); // Scale point size based on distance
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    varying float vAlpha;
    void main() {
      float distanceToCenter = length(gl_PointCoord - vec2(0.5));
      float strength = 0.05 / distanceToCenter - 0.1; // Create a round shape
      gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha * strength);
    }
  `;

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
};

// Star component with twinkling effect
export function Stars() {
  const starRef = useRef();
  const starCount = 600; // Number of stars

  // Generate star positions, sizes, and random twinkle speeds
  const starsData = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const alphas = new Float32Array(starCount);
    const twinkleSpeeds = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100; // X position
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100; // Y position
      positions[i * 3 + 2] = Math.random() * -50 - 10; // Z position (deeper into scene)

      sizes[i] = Math.random() * 2 + 1; // Random size
      alphas[i] = Math.random() * 0.8 + 0.2; // Random initial alpha
      twinkleSpeeds[i] = Math.random() * 2 + 1; // Random twinkle speed
    }

    return { positions, sizes, alphas, twinkleSpeeds };
  }, []);

  // Twinkle effect
  useFrame(({ clock }) => {
    if (starRef.current) {
      const time = clock.getElapsedTime();
      const alphas = starRef.current.geometry.attributes.alpha.array;

      for (let i = 0; i < starCount; i++) {
        alphas[i] = Math.sin(time * starsData.twinkleSpeeds[i]) * 0.5 + 0.5; // Smooth twinkle
      }

      starRef.current.geometry.attributes.alpha.needsUpdate = true;
    }
  });

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={starsData.positions}
          count={starCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={starsData.sizes}
          count={starCount}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-alpha"
          array={starsData.alphas}
          count={starCount}
          itemSize={1}
        />
      </bufferGeometry>
      <primitive object={StarMaterial()} />
    </points>
  );
}