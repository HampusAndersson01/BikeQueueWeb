import React, { useEffect, useRef } from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  // Use a ref to store the audio instance to avoid re-instantiating it
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize the audio instance on first render
    audioRef.current = new Audio(`${process.env.PUBLIC_URL}/alert.mp3`);

    return () => {
      // Cleanup the audio instance when the component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Play audio when timeLeft reaches 0
    if (timeLeft === 0 && audioRef.current) {
      audioRef.current.play();
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  // Determine the class based on timeLeft
  const getTimerClass = () => {
    if (timeLeft <= 0) {
      return "timer green";
    } else if (timeLeft < 60) {
      return "timer orange";
    }
    return "timer";
  };

  return (
    <div className={getTimerClass()}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
};

export default Timer;
