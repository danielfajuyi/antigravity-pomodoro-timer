import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Controls = ({ isActive, onToggle, onReset }) => {
  return (
    <div className="controls">
      <button 
        className={`btn btn-toggle ${isActive ? 'active' : ''}`} 
        onClick={onToggle}
        aria-label={isActive ? 'Pause Timer' : 'Start Timer'}
      >
        {isActive ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
      </button>
      
      <button 
        className="btn btn-reset" 
        onClick={onReset}
        aria-label="Reset Timer"
      >
        <RotateCcw size={24} />
      </button>
    </div>
  );
};

export default Controls;
