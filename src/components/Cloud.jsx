import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";

export function Cloud({ sceneOpacity, position, scale, ...props }) {
  const { nodes, materials } = useGLTF("./models/cloud/model.gltf");

  const materialRef = useRef();
  const cloudRef = useRef();

  // Initialize opacity
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.opacity = sceneOpacity.current;
    }
  });

  useEffect(() => {
    // GSAP animation to move cloud up and down
    const cloud = cloudRef.current;
    gsap.to(cloud.position, {
      y: cloud.position.y + (Math.random() * 1 - 0.1), // Smaller random up/down movement for smoother effect
      duration: 6 + Math.random() * 4, // Slower movement with slightly randomized duration
      repeat: -1, // Infinite loop
      yoyo: true, // Alternate movement (up and down)
      ease: "power1.inOut", // Smooth easing for slower transitions
      delay: Math.random() * 1, // Random delay to stagger animations
    });
  }, []);

  return (
    <group {...props} ref={cloudRef} position={position} dispose={null}>
      <mesh geometry={nodes.Mball001.geometry} scale={scale}>
        <meshStandardMaterial
          ref={materialRef}
          onBeforeCompile={fadeOnBeforeCompile}
          transparent
          envMapIntensity={2}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/cloud/model.gltf");
