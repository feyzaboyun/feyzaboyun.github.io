import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";
import { Routes, Route } from "react-router-dom";
import Registry from "./components/Registry";
import VenueDetails from "./components/VenueDetails";
import RSVP from "./components/RSVP";
import Destination from "./components/Destination";
import { useMemo } from "react";

function App() {
  const { play, end } = usePlay();

  const effects = useMemo(() => (
    <EffectComposer>
      <Noise opacity={0.01} />
    </EffectComposer>
  ), []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Canvas style={{ width: "100vw", height: "100vh" }}>
              <color attach="background" args={["#ececec"]} />
              <ScrollControls
                pages={play && !end ? 20 : 0}
                damping={0.5}
                style={{
                  top: "0px",
                  left: "0px",
                  right: "0px",
                  bottom: "0px",
                  width: "100%",
                  height: "100%",
                  animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
                  opacity: play && !end ? 1 : 0,
                }}
              >
                <Experience />
              </ScrollControls>
              {effects}
            </Canvas>
            <Overlay />
          </>
        }
      />
      <Route path="/venuedetails" element={<VenueDetails />} />
      <Route path="/registry" element={<Registry />} />
      <Route path="/rsvp" element={<RSVP />} />
      <Route path="/destination" element={<Destination />} />
    </Routes>
  );
}

export default App;
