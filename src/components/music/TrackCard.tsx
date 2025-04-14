
import { Play, Pause, MoreHorizontal } from "lucide-react";
import { Track, formatTime } from "@/data/musicData";
import { useMusic } from "@/context/MusicContext";
import { Button } from "@/components/ui/button";

interface TrackCardProps {
  track: Track;
  index?: number;
  showCover?: boolean;
  showAlbum?: boolean;
  view?: "list" | "grid";
}

const TrackCard = ({ 
  track, 
  index, 
  showCover = true, 
  showAlbum = true,
  view = "list" 
}: TrackCardProps) => {
  const { 
    currentTrack, 
    isPlaying, 
    playTrack, 
    togglePlayPause,
    addToQueue
  } = useMusic();
  
  const isCurrentTrack = currentTrack?.id === track.id;
  
  const handlePlay = () => {
    if (isCurrentTrack) {
      togglePlayPause();
    } else {
      playTrack(track);
    }
  };
  
  if (view === "grid") {
    return (
      <div className="group relative overflow-hidden rounded-lg">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img 
            src={track.coverImage} 
            alt={track.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90"
            onClick={handlePlay}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </Button>
        </div>
        <div className="mt-2">
          <h3 className="font-medium truncate">{track.title}</h3>
          <p className="text-xs text-gray-400 truncate">{track.artist}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`group flex items-center p-2 rounded-md hover:bg-white/5 transition-colors ${isCurrentTrack ? 'bg-white/10' : ''}`}
    >
      {index !== undefined && (
        <div className="w-8 text-center text-sm text-gray-400">
          {index + 1}
        </div>
      )}
      
      {showCover && (
        <div className="h-10 w-10 mr-3 relative overflow-hidden rounded">
          <img 
            src={track.coverImage} 
            alt={track.title} 
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            onClick={handlePlay}
          >
            {isCurrentTrack && isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white ml-0.5" />
            )}
          </div>
        </div>
      )}
      
      <div className="flex-grow min-w-0">
        <h3 className={`font-medium truncate ${isCurrentTrack ? 'text-primary' : 'text-white'}`}>
          {track.title}
        </h3>
        <p className="text-xs text-gray-400 truncate">
          {track.artist}
          {showAlbum && ` • ${track.album}`}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-xs text-gray-400">{formatTime(track.duration)}</span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TrackCard;
