import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import soundFile from "../assets/did-i-tell-u-that-i-miss-u.wav"; // Adjust the path as needed

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true); // Start with audio muted
  const audioRef = useRef(null); // Use a ref to persist the audio instance

  useEffect(() => {
    // Initialize the audio
    const newAudio = new Audio(soundFile);
    newAudio.loop = true;
    newAudio.muted = isMuted; // Set initial mute state
    audioRef.current = newAudio;

    // Attempt to play the audio
    const playAudio = async () => {
      try {
        await newAudio.play();
      } catch (err) {
        console.error("Autoplay blocked or failed:", err);
      }
    };

    playAudio();

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Release the audio resource
        audioRef.current = null;
      }
    };
  }, []); // Only run once on mount

  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted; // Toggle mute state
      setIsMuted(audioRef.current.muted); // Update state to reflect mute status

      // If unmuting, attempt to play the audio
      if (!audioRef.current.muted) {
        audioRef.current.play().catch((err) => console.error("Play error:", err));
      }
    }
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);