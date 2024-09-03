import React from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  return (
    <div className="timer">
      {formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
};

export default Timer;
