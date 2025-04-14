
import React, { useEffect, useState, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioElement?: HTMLAudioElement | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, audioElement }) => {
  const [barHeights, setBarHeights] = useState<number[]>(Array(12).fill(0.3));
  const requestRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const isConnectedRef = useRef<boolean>(false);

  // Set up audio analyzer when component mounts or audio element changes
  useEffect(() => {
    if (!audioElement) return;
    
    // Clean up previous connections
    if (audioContextRef.current && sourceNodeRef.current && isConnectedRef.current) {
      sourceNodeRef.current.disconnect();
      analyserRef.current?.disconnect();
      isConnectedRef.current = false;
    }
    
    // Only create a new audio context and analyzer if needed
    if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 64; // Must be a power of 2
        
        // Only create a media element source if we haven't already
        if (!isConnectedRef.current) {
          const source = audioContext.createMediaElementSource(audioElement);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          
          sourceNodeRef.current = source;
          isConnectedRef.current = true;
        }
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;
        audioContextRef.current = audioContext;
      } catch (error) {
        console.error("Error setting up audio context:", error);
      }
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [audioElement]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.disconnect();
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      isConnectedRef.current = false;
      sourceNodeRef.current = null;
      analyserRef.current = null;
      dataArrayRef.current = null;
      audioContextRef.current = null;
    };
  }, []);

  const updateVisualizer = () => {
    if (!isPlaying || !analyserRef.current || !dataArrayRef.current) {
      // Simulate some movement even when not playing
      const newHeights = barHeights.map(() => 
        Math.max(0.1, Math.min(0.5, 0.3 + (Math.random() * 0.1 - 0.05)))
      );
      setBarHeights(newHeights);
      requestRef.current = requestAnimationFrame(updateVisualizer);
      return;
    }

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Get a subset of frequencies for visualization
    const barCount = barHeights.length;
    const step = Math.floor(dataArrayRef.current.length / barCount);
    
    const newHeights = Array(barCount).fill(0).map((_, i) => {
      const index = i * step;
      // Normalize value between 0 and 1, with some minimum height
      return Math.max(0.1, Math.min(1, dataArrayRef.current!.at(index)! / 255));
    });
    
    setBarHeights(newHeights);
    requestRef.current = requestAnimationFrame(updateVisualizer);
  };

  // Start/stop animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateVisualizer);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div className="flex items-end h-full gap-[2px] justify-center w-full">
      {barHeights.map((height, index) => (
        <div
          key={index}
          className="w-1 bg-primary rounded-full transition-height duration-100"
          style={{ 
            height: `${height * 100}%`,
            transform: `scaleY(${height})`,
            transformOrigin: 'bottom',
            transition: 'transform 0.1s ease-in-out' 
          }}
        ></div>
      ))}
    </div>
  );
};

export default AudioVisualizer;
