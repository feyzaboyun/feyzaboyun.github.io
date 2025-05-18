import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PlayProvider } from "./contexts/Play";
import "./index.css";
import { AudioProvider } from './contexts/AudioContext'; // Adjust the path if needed

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PlayProvider>
      <AudioProvider>
      <App />
      </AudioProvider>
    </PlayProvider>
  </React.StrictMode>
);
