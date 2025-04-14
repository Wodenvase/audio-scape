
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface EnhancedVisualizerProps {
  isPlaying: boolean;
  audioElement?: HTMLAudioElement | null;
}

const EnhancedVisualizer: React.FC<EnhancedVisualizerProps> = ({ isPlaying, audioElement }) => {
  const [barHeights, setBarHeights] = useState<number[]>(Array(40).fill(0.3));
  const [bassLevel, setBassLevel] = useState<number>(0);
  const [peakLevel, setPeakLevel] = useState<number>(0);
  const requestRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const isConnectedRef = useRef<boolean>(false);
  const gradientRef = useRef<string[]>([
    "rgba(147, 51, 234, 0.7)",  // Purple
    "rgba(236, 72, 153, 0.7)",  // Pink
    "rgba(59, 130, 246, 0.7)",  // Blue
  ]);

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
        analyser.fftSize = 1024; // Increased for more detailed visualization
        
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
      setPeakLevel(0.1 + Math.random() * 0.2);
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
    
    // Extract bass frequencies for background pulse effect (0-100 Hz)
    const bassFrequencies = dataArrayRef.current.slice(0, 10); 
    const bassAverage = bassFrequencies.reduce((sum, val) => sum + val, 0) / bassFrequencies.length;
    const normalizedBass = Math.max(0.2, Math.min(1, bassAverage / 255));
    
    // Extract peak/high frequencies (10k-20kHz)
    const peakFrequencies = dataArrayRef.current.slice(dataArrayRef.current.length - 20);
    const peakAverage = peakFrequencies.reduce((sum, val) => sum + val, 0) / peakFrequencies.length;
    const normalizedPeak = Math.max(0.1, Math.min(1, peakAverage / 255));
    
    setBarHeights(newHeights);
    setBassLevel(normalizedBass);
    setPeakLevel(normalizedPeak);
    
    // Adjust the gradient colors based on frequency response
    const newGradient = [
      `rgba(${Math.floor(147 + normalizedBass * 100)}, ${Math.floor(51 + normalizedBass * 100)}, 234, 0.7)`,
      `rgba(236, ${Math.floor(72 + normalizedPeak * 100)}, ${Math.floor(153 + normalizedPeak * 50)}, 0.7)`,
      `rgba(59, 130, ${Math.floor(246 - normalizedBass * 50)}, 0.7)`
    ];
    gradientRef.current = newGradient;
    
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
        className="absolute inset-0 rounded-full filter blur-3xl"
        style={{ 
          background: `radial-gradient(circle, ${gradientRef.current[0]} 0%, ${gradientRef.current[1]} 50%, ${gradientRef.current[2]} 100%)`,
          scale: bassLevel,
          opacity: bassLevel * 0.7
        }}
      />
      
      {/* Peak frequency highlight */}
      <motion.div 
        className="absolute inset-0 rounded-full filter blur-xl"
        style={{ 
          background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)`,
          scale: peakLevel,
          opacity: peakLevel * 0.5
        }}
      />
      
      <div className="flex items-end h-full gap-[1px] justify-center w-full relative z-10">
        {barHeights.map((height, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-t from-primary/80 to-white/80 rounded-full"
            style={{ 
              height: `${height * 100}%`,
              width: index % 3 === 0 ? 2 : 1,
              scaleY: height,
              opacity: 0.7 + height * 0.3
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              duration: 0.1
            }}
            layout
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedVisualizer;
