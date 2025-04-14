
import { useState, useRef, useEffect } from "react";
import { useMusic } from "@/context/MusicContext";
import { formatTime } from "@/data/musicData";
import { 
  Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, RefreshCcw, Eye, EyeOff,
  Maximize2, Minimize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import EnhancedVisualizer from "./EnhancedVisualizer";
import FullscreenVisualizer from "./FullscreenVisualizer";
import { useIsMobile } from "@/hooks/use-mobile";
import GlassCard from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlayPause,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
    audioRef,
  } = useMusic();
  
  const [showVolume, setShowVolume] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [isFullscreenVisualizer, setIsFullscreenVisualizer] = useState(false);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const progressWidth = progressRect.width;
    const seekTime = (clickPosition / progressWidth) * duration;
    
    seekTo(seekTime);
  };
  
  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const resetMood = () => {
    if (currentTrack) {
      // Reset to first track or perform any other reset action
      // For now, we'll just skip to next track as a placeholder
      nextTrack();
    }
  };
  
  if (!currentTrack) {
    return null;
  }
  
  return (
    <>
      <AnimatePresence>
        {currentTrack && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-40"
          >
            <GlassCard className="border-t border-white/5 rounded-b-none">
              {/* Visualizer area */}
              {showVisualizer && (
                <div className="h-16 px-4 pt-2 overflow-hidden">
                  <EnhancedVisualizer isPlaying={isPlaying} audioElement={audioRef?.current} />
                </div>
              )}
              
              {/* Progress bar */}
              <div 
                ref={progressRef}
                className="w-full h-1 bg-gray-700/50 cursor-pointer" 
                onClick={handleProgressClick}
              >
                <motion.div
                  className="h-full bg-primary"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  layoutId="progress"
                />
              </div>
              
              <div className="container mx-auto px-4 py-3">
                <div className={`flex items-center ${isMobile ? 'flex-col gap-2' : 'justify-between'}`}>
                  {/* Track info */}
                  <div className={`flex items-center space-x-4 ${isMobile ? 'w-full justify-between mb-2' : 'w-1/4'}`}>
                    <div className="flex items-center gap-3">
                      <motion.img 
                        src={currentTrack.coverImage} 
                        alt={currentTrack.title} 
                        className="h-10 w-10 rounded-md object-cover shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                      <div className="truncate max-w-[120px] sm:max-w-[200px]">
                        <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
                        <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-primary"
                        onClick={() => setShowVisualizer(!showVisualizer)}
                      >
                        {showVisualizer ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-primary"
                        onClick={() => setIsFullscreenVisualizer(true)}
                      >
                        <Maximize2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Player controls */}
                  <div className={`flex flex-col items-center space-y-2 ${isMobile ? 'w-full' : 'w-2/4'}`}>
                    <div className="flex items-center space-x-3">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          onClick={resetMood} 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-white rounded-full"
                        >
                          <RefreshCcw className="h-5 w-5" />
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          onClick={previousTrack} 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-white rounded-full"
                        >
                          <SkipBack className="h-5 w-5" />
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        className="z-10"
                      >
                        <Button 
                          onClick={togglePlayPause} 
                          className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 flex items-center justify-center"
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5 ml-0.5" />
                          )}
                        </Button>
                      </motion.div>
                      
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                          onClick={nextTrack} 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-white rounded-full"
                        >
                          <SkipForward className="h-5 w-5" />
                        </Button>
                      </motion.div>
                      
                      <div className="relative">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400 hover:text-white rounded-full"
                            onClick={() => setShowVolume(!showVolume)}
                          >
                            {isMuted || volume === 0 ? (
                              <VolumeX className="h-5 w-5" />
                            ) : (
                              <Volume2 className="h-5 w-5" />
                            )}
                          </Button>
                        </motion.div>
                        
                        <AnimatePresence>
                          {showVolume && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-full right-0 mb-2 p-2 glass-effect rounded-md shadow-lg"
                            >
                              <Slider
                                className="w-24"
                                min={0}
                                max={1}
                                step={0.01}
                                value={[volume]}
                                onValueChange={handleVolumeChange}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {!isMobile && (
                      <div className="flex items-center space-x-2 w-full max-w-md">
                        <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
                        
                        <div className="relative flex-1">
                          <div 
                            className="h-1 bg-gray-700/50 rounded-full cursor-pointer" 
                            onClick={handleProgressClick}
                          >
                            <div
                              className="absolute h-1 bg-primary rounded-full"
                              style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* This is an empty div to maintain layout balance on non-mobile screens */}
                  {!isMobile && <div className="w-1/4"></div>}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Fullscreen Visualizer */}
      <FullscreenVisualizer 
        isVisible={isFullscreenVisualizer} 
        onClose={() => setIsFullscreenVisualizer(false)} 
      />
    </>
  );
};

export default MusicPlayer;
