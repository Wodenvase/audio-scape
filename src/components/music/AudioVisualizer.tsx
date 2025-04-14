
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioElement?: HTMLAudioElement | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, audioElement }) => {
  const [barHeights, setBarHeights] = useState<number[]>(Array(20).fill(0.3));
  const [bassLevel, setBassLevel] = useState<number>(0);
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
        analyser.fftSize = 256; // Increased for more detailed visualization
        
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
      setBassLevel(0.2 + Math.random() * 0.1);
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
    
    // Extract bass frequencies for background pulse effect
    const bassFrequencies = dataArrayRef.current.slice(0, 5);
    const bassAverage = bassFrequencies.reduce((sum, val) => sum + val, 0) / bassFrequencies.length;
    const normalizedBass = Math.max(0.2, Math.min(1, bassAverage / 255));
    
    setBarHeights(newHeights);
    setBassLevel(normalizedBass);
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
    <div className="relative flex flex-col h-full w-full">
      {/* Background pulse effect based on bass */}
      <motion.div 
        className="absolute inset-0 bg-primary/20 rounded-full filter blur-3xl"
        style={{ 
          scale: bassLevel,
          opacity: bassLevel * 0.7
        }}
      />
      
      <div className="flex items-end h-full gap-[2px] justify-center w-full relative z-10">
        {barHeights.map((height, index) => (
          <motion.div
            key={index}
            className={`w-1 bg-primary rounded-full`}
            style={{ 
              height: `${height * 100}%`,
              scaleY: height,
              opacity: 0.7 + height * 0.3
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            layout
          />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;
