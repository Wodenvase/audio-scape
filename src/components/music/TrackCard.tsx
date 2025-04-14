
import { Play, Pause, MoreHorizontal, ListPlus, Plus } from "lucide-react";
import { Track, formatTime } from "@/data/musicData";
import { useMusic } from "@/context/MusicContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    addToQueue,
    myPlaylists,
    addToPlaylist
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
        <div className="mt-2 flex justify-between items-start">
          <div>
            <h3 className="font-medium truncate">{track.title}</h3>
            <p className="text-xs text-gray-400 truncate">{track.artist}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-music-dark border-white/10">
              <DropdownMenuItem onClick={() => addToQueue(track)}>
                <ListPlus className="mr-2 h-4 w-4" />
                Add to Queue
              </DropdownMenuItem>
              {myPlaylists.map(playlist => (
                <DropdownMenuItem 
                  key={playlist.id} 
                  onClick={() => addToPlaylist(track, playlist.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add to {playlist.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
            className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-music-dark border-white/10">
            <DropdownMenuItem onClick={() => addToQueue(track)}>
              <ListPlus className="mr-2 h-4 w-4" />
              Add to Queue
            </DropdownMenuItem>
            {myPlaylists.map(playlist => (
              <DropdownMenuItem 
                key={playlist.id} 
                onClick={() => addToPlaylist(track, playlist.id)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to {playlist.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TrackCard;
