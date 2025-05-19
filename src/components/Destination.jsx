import React, { useRef, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { Stars } from "./stars";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Apply global fix for both vertical and horizontal scrolling
const setGlobalStyles = () => {
  document.documentElement.style.margin = "0";
  document.documentElement.style.padding = "0";
  document.documentElement.style.overflowX = "hidden";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.overflowX = "hidden";
};

function Destination() {
  const backgroundColors = useRef({
    colorA: "#001540",
    colorB: "#001C57",
  });

  const sceneOpacity = useRef(1);

  const clouds = useMemo(() => {
    const numClouds = 40;
    return Array.from({ length: numClouds }, () => ({
      position: [
        Math.random() * 60 - 20,
        Math.random() * 60 - 20,
        Math.random() * -60,
      ],
      scale: Math.random() * 1.6 + 0.3,
    }));
  }, []);

  useEffect(() => {
    setGlobalStyles();

    // Animate destination text on enter
    gsap.fromTo(
      ".destination-text",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".destination-text",
          toggleActions: "play none none none",
          onEnterBack: (self) => self.progress(1) && self.disable(),
        },
      }
    );

    // Animate more-content sliding in from the right (no overflow)
    gsap.fromTo(
      ".more-content",
      { opacity: 1, x: 300 }, // x: 300px instead of 600 to stay in-bounds
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".more-content",
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          scrub: true,
          markers: false, // Set to true for debugging
        },
      }
    );

    gsap.fromTo(
        ".more-content2",
        { opacity: 1, x: -300 }, // x: 300px instead of 600 to stay in-bounds
        {
          opacity: 1,
          x: 0,
          scrollTrigger: {
            trigger: ".more-content2",
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
            scrub: true,
            markers: false, // Set to true for debugging
          },
        }
      );

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Background backgroundColors={backgroundColors} />
        <Stars />
        {clouds.map((cloud, index) => (
          <Cloud
            key={index}
            sceneOpacity={sceneOpacity}
            position={cloud.position}
            scale={cloud.scale}
          />
        ))}
      </Canvas>

      <div
        className="scroll-container"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40vh",
          gap: "60vh",
          color: "#ffffff",
          maxWidth: "100%",
          paddingBottom: "100vh", // Add this!
          overflowX: "hidden",
        }}
      >
        <div
          className="destination-text"
          style={{
            maxWidth: "800px",
            textAlign: "center",
            padding: "0 16px",
          }}
        >
          <h1>Destination Info</h1>
          <p>Welcome to the registry!</p>
        </div>

        <div
          className="more-content"
          style={{
            maxWidth: "800px",
            textAlign: "center",
            padding: "0 16px",
          }}
        >
          <h2>More Content</h2>
          <p>Scroll down to see more!</p>
        </div>

        <div
          className="more-content2"
          style={{
            maxWidth: "800px",
            textAlign: "center",
            padding: "0 16px",
          }}
        >
          <h3>More Content2</h3>
          <p>Scroll down to see more!</p>
        </div>
      </div>
    </div>
  );
}

export default Destination;
