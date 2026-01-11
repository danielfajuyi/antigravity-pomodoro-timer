import React, { useState, useEffect, useRef } from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import './index.css';
import notificationSound from './assets/timer-confirmation-sound.mp3';

const DEFAULT_WORK_TIME = 25 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK_TIME);
  const [isActive, setIsActive] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);
  const audioRef = useRef(new Audio(notificationSound));

  // Play notification sound
  const playNotification = () => {
    audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
  };

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(ti => ti - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      playNotification();
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(customMinutes * 60);
  };

  const handleTimeChange = (e) => {
      const minutes = parseInt(e.target.value);
      if (!isNaN(minutes) && minutes > 0 && minutes <= 180) {
          setCustomMinutes(minutes);
          if (!isActive) {
              setTimeLeft(minutes * 60);
          }
      } else if (e.target.value === '') {
        setCustomMinutes('');
      }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h2 className="title">Focus Timer</h2>
        <TimerDisplay timeLeft={timeLeft} />
        
        <Controls 
          isActive={isActive} 
          onToggle={toggleTimer} 
          onReset={resetTimer} 
        />
        
        <div className="custom-input-container">
            <label htmlFor="custom-minutes" className="input-label">Set Minutes:</label>
            <input 
                id="custom-minutes"
                type="number" 
                className="custom-input"
                value={customMinutes}
                onChange={handleTimeChange}
                disabled={isActive}
                min="1"
                max="180"
            />
        </div>

        <div className="status-indicator">
          {isActive ? 'Keep Focusing' : timeLeft === 0 ? 'Time is up!' : 'Ready to start?'}
        </div>
      </div>
    </div>
  );
}

export default App;
