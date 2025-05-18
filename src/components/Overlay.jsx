import React from "react";
import { useProgress } from "@react-three/drei";
import { usePlay } from "../contexts/Play";
import { Navigate } from "react-router-dom";
import { useAudio } from "../contexts/AudioContext";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  const [goToRegistry, setGoToRegistry] = React.useState(false);
  const [goToMainPage, setGoToMainPage] = React.useState(false);
  const [goToVenueDetails, setGoToVenueDetails] = React.useState(false);
  const [goToRSVP, setGoToRSVP] = React.useState(false);
  const [goToDestination, setGoToDestination] = React.useState(false);
  const { isMuted, toggleAudio } = useAudio(); // Access audio state and toggle function

  const handleReload = () => {
    window.location.reload();
  };

  // Navigate if any of the states are true
  if (goToRegistry) {
    return <Navigate to="/registry" />;
  }
  if (goToMainPage) {
    return <Navigate to="/" />;
  }
  if (goToVenueDetails) {
    return <Navigate to="/venuedetails" />;
  }
  if (goToRSVP) {
    return <Navigate to="/rsvp" />;
  }
  if (goToDestination) {
    return <Navigate to="/destination" />;
  }

  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""} ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div className={`loader ${progress === 100 ? "loader--disappear" : ""}`} />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            Feyza&Austin
            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>
          <p className="intro__scroll">Scroll to begin</p>
          
          <button className="rsvp" onClick={() => setGoToRSVP(true)}>
            rsvp 
          </button>
          <button className="explore" onClick={() => setPlay(true)}>
            our story
          </button>
          <button className="registry" onClick={() => setGoToRegistry(true)}>
            registry  
          </button>
          <button className="venuedetails" onClick={() => setGoToVenueDetails(true)}>
            venue details 
          </button>
          <button className="destination" onClick={() => setGoToDestination(true)}>
            destination info 
          </button>
          <button
            className={`audio ${isMuted ? "audio--muted" : "audio--unmuted"}`}
            onClick={toggleAudio}
          >
            {isMuted ? "unmute" : "mute"}
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">Hope to see you...</p>
        <button
          className="mainpage"
          onClick={() => {
            handleReload();
            setGoToMainPage(true);
          }}
        >
          Main Page
        </button>
      </div>
      
    </div>
  );
};
