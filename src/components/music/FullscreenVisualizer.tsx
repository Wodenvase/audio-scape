
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMusic } from "@/context/MusicContext";
import { X } from 'lucide-react';

interface FullscreenVisualizerProps {
  isVisible: boolean;
  onClose: () => void;
}

const FullscreenVisualizer: React.FC<FullscreenVisualizerProps> = ({ 
  isVisible, 
  onClose 
}) => {
  const { currentTrack, isPlaying, audioRef } = useMusic();
  const [particles, setParticles] = useState<{ x: number, y: number, size: number, speed: number, opacity: number }[]>([]);
  const [bassIntensity, setBassIntensity] = useState(0);
  const [midIntensity, setMidIntensity] = useState(0);
  const [trebleIntensity, setTrebleIntensity] = useState(0);
  const [dominantColor, setDominantColor] = useState("hsl(263, 83%, 75%)"); // Default to primary color
  
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Initialize particles
  useEffect(() => {
    if (isVisible) {
      const newParticles = Array.from({ length: 80 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.25
      }));
      
      setParticles(newParticles);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when visualizer is open
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);
  
  // Set up audio analyzer
  useEffect(() => {
    if (!isVisible || !audioRef.current) return;
    
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 1024;
        
        // Only create source if we need to
        if (!sourceNodeRef.current && audioRef.current) {
          sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
          sourceNodeRef.current.connect(analyserRef.current);
          analyserRef.current.connect(audioContextRef.current.destination);
        }
        
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
      }
      
      // Start animation
      if (animationRef.current === null) {
        animationFrameLoop();
      }
    } catch (error) {
      console.error("Error setting up fullscreen visualizer:", error);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isVisible, audioRef.current]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Animation frame loop for visualization
  const animationFrameLoop = () => {
    if (!analyserRef.current || !dataArrayRef.current) {
      animationRef.current = requestAnimationFrame(animationFrameLoop);
      return;
    }
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Calculate intensity for different frequency ranges
    const bassRange = dataArrayRef.current.slice(0, 10); // Bass: 0-200Hz
    const midRange = dataArrayRef.current.slice(10, 100); // Mids: 200Hz-2kHz
    const trebleRange = dataArrayRef.current.slice(100, 512); // Treble: 2kHz+
    
    const getAverage = (arr: Uint8Array) => 
      arr.reduce((sum, val) => sum + val, 0) / arr.length / 255;
    
    const newBass = getAverage(bassRange);
    const newMid = getAverage(midRange);
    const newTreble = getAverage(trebleRange);
    
    setBassIntensity(newBass);
    setMidIntensity(newMid);
    setTrebleIntensity(newTreble);
    
    // Adjust dominant color based on frequencies
    if (currentTrack) {
      // Generate color based on frequencies - just a fun example mapping
      const h = Math.floor(263 + (newBass - newTreble) * 100); // Shift hue based on bass/treble balance
      const s = Math.floor(70 + newMid * 30); // Saturation based on mids
      const l = Math.floor(65 + newBass * 15); // Lightness with some bass influence
      
      setDominantColor(`hsl(${h}, ${s}%, ${l}%)`);
    }
    
    // Update canvas if using canvas for visualization
    if (canvasRef.current) {
      drawVisualization();
    }
    
    animationRef.current = requestAnimationFrame(animationFrameLoop);
  };
  
  // Draw visualization on canvas
  const drawVisualization = () => {
    if (!canvasRef.current || !dataArrayRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles
    particles.forEach((particle, i) => {
      const bassFactor = bassIntensity * 2;
      const particleSize = particle.size * (1 + bassFactor);
      
      // Move particles up with varying speeds
      particles[i].y -= particle.speed * (isPlaying ? 1 + bassIntensity : 0.5);
      
      // Wrap around when they reach the top
      if (particles[i].y < -20) {
        particles[i].y = canvas.height + 20;
        particles[i].x = Math.random() * canvas.width;
      }
      
      // Draw the particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particleSize * 3
      );
      
      gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.opacity * (1 + trebleIntensity)})`);
      gradient.addColorStop(0.5, `${dominantColor.replace('hsl', 'hsla').replace(')', `, ${particle.opacity * 0.6})`)})`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particleSize * 3, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50"
          onClick={onClose}
        >
          {/* Background gradients that react to music */}
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div 
            className="absolute inset-0 filter blur-3xl"
            style={{ 
              background: `radial-gradient(circle at center, ${dominantColor} 0%, transparent 70%)`,
              opacity: bassIntensity * 0.8 + 0.2,
              scale: 1 + bassIntensity * 0.3
            }}
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[50vh] filter blur-3xl"
            style={{ 
              background: `linear-gradient(to top, ${dominantColor} 0%, transparent 100%)`,
              opacity: midIntensity * 0.6 + 0.1
            }}
          />
          
          {/* Canvas for particle visualization */}
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-10 pointer-events-none"
          />
          
          {/* Track info overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            {currentTrack && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <motion.h2 
                  className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow"
                  animate={{ 
                    scale: 1 + bassIntensity * 0.05,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  {currentTrack.title}
                </motion.h2>
                <motion.p 
                  className="text-xl md:text-2xl text-white/80"
                  animate={{ 
                    opacity: 0.6 + trebleIntensity * 0.4 
                  }}
                >
                  {currentTrack.artist}
                </motion.p>
              </motion.div>
            )}
          </div>
          
          {/* Close button */}
          <motion.button
            className="absolute top-5 right-5 text-white p-2 rounded-full bg-black/30 backdrop-blur-md z-30 pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={24} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenVisualizer;
