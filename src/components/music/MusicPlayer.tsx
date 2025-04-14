
import { useState, useRef, useEffect } from "react";
import { useMusic } from "@/context/MusicContext";
import { formatTime } from "@/data/musicData";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioVisualizer from "./AudioVisualizer";

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
  } = useMusic();
  
  const [showVolume, setShowVolume] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  
  const progressRef = useRef<HTMLDivElement>(null);
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    
    const progressRect = progressRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - progressRect.left;
    const progressWidth = progressRect.width;
    const seekTime = (clickPosition / progressWidth) * duration;
    
    seekTo(seekTime);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
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
  
  if (!currentTrack) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-music-darker border-t border-white/10 backdrop-blur-lg z-40">
      {/* Progress bar */}
      <div 
        ref={progressRef}
        className="w-full h-1 bg-gray-700 cursor-pointer" 
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-primary"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Track info */}
        <div className="flex items-center space-x-4 w-1/4">
          <img 
            src={currentTrack.coverImage} 
            alt={currentTrack.title} 
            className="h-12 w-12 rounded-md object-cover"
          />
          <div className="truncate">
            <h4 className="text-sm font-medium truncate">{currentTrack.title}</h4>
            <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Player controls */}
        <div className="flex flex-col items-center space-y-2 w-2/4">
          <div className="flex items-center space-x-4">
            <Button onClick={previousTrack} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <SkipBack className="h-5 w-5" />
            </Button>
            
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
            
            <Button onClick={nextTrack} variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400 w-10">{formatTime(currentTime)}</span>
            
            <div className="relative flex-1">
              <div 
                ref={progressRef}
                className="h-1 bg-gray-700 rounded-full cursor-pointer" 
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
        </div>
        
        {/* Additional controls */}
        <div className="flex items-center space-x-3 w-1/4 justify-end">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={() => setShowVolume(!showVolume)}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </Button>
            
            {showVolume && (
              <div className="absolute bottom-full right-0 mb-2 p-2 bg-music-dark rounded-md shadow-lg">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 accent-primary"
                />
              </div>
            )}
          </div>
          
          <div className="h-8 flex space-x-1">
            <AudioVisualizer isPlaying={isPlaying} />
          </div>
          
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
