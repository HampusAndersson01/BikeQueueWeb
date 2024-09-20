import React from "react";

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
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
