
import React, { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying }) => {
  const [heights, setHeights] = useState([0.3, 0.5, 0.7, 0.5, 0.3]);

  useEffect(() => {
    if (!isPlaying) {
      setHeights([0.3, 0.4, 0.5, 0.4, 0.3]);
      return;
    }

    const interval = setInterval(() => {
      const newHeights = heights.map(() => Math.random() * 0.8 + 0.2);
      setHeights(newHeights);
    }, 200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-end h-full space-x-[2px]">
      {heights.map((height, index) => (
        <div
          key={index}
          className="w-1 bg-primary rounded-sm transition-all duration-200 ease-in-out"
          style={{ height: `${height * 100}%` }}
        ></div>
      ))}
    </div>
  );
};

export default AudioVisualizer;
