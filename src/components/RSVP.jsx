import React, { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Background } from "./Background"; // Import Background
import { Cloud } from "./Cloud"; // Import Cloud

function RSVP() {
  const tl = useRef();
  const backgroundColors = useRef({
    colorA: "#185a9d",
    colorB: "#43cea2",
  });

  const sceneOpacity = useRef(1); // You can control this opacity to fade clouds if needed

  // Generate random cloud positions and scales
  const clouds = useMemo(() => {
    const numClouds = 40; // Number of clouds you want
    const cloudArray = [];

    for (let i = 0; i < numClouds; i++) {
      // Random position within a wider range to spread clouds more
      cloudArray.push({
        position: [
          Math.random() * 60 - 20, // x between -20 and 20 (much wider horizontal spread)
          Math.random() * 60 - 20, // y between -4 and 4 (wider vertical spread)
          Math.random() * -60,     // z between -40 and 0 (spread across a deeper scene)
        ],
        scale: Math.random() * 1.6 + 0.3, // Random scale between 0.3 and 1.8 (smaller to medium clouds)
      });
    }

    return cloudArray;
  }, []);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Full-screen Canvas for 3D background */}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0, // Ensure the canvas stays in the background
        }}
      >
        {/* Background component */}
        <Background backgroundColors={backgroundColors} />
        
        {/* Randomly placed clouds */}
        {clouds.map((cloud, index) => (
          <Cloud
            key={index}
            sceneOpacity={sceneOpacity}
            position={cloud.position}
            scale={cloud.scale}
          />
        ))}
      </Canvas>

      {/* Text content layered on top */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#FFFFFF", // Adjust text color for visibility
          textAlign: "center",
          zIndex: 1, // Ensure text appears above the canvas
        }}
      >
        <h1>RSVP</h1>
        <p>Welcome to the registry!</p>
      </div>
    </div>
  );
}

export default RSVP;
