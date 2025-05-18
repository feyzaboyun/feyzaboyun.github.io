import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayProvider } from "./contexts/Play";
import { AudioProvider } from "./contexts/AudioContext";
import { HashRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <PlayProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </PlayProvider>
    </HashRouter>
  </React.StrictMode>
);
