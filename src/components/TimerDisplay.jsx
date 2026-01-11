import React from 'react';

const TimerDisplay = ({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="timer-display">
      <h1 className="time-text">{formattedTime}</h1>
    </div>
  );
};

export default TimerDisplay;
