
import { Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { Playlist } from "@/data/musicData";
import { Button } from "@/components/ui/button";

interface PlaylistCardProps {
  playlist: Playlist;
  size?: "small" | "medium" | "large";
}

const PlaylistCard = ({ playlist, size = "medium" }: PlaylistCardProps) => {
  const sizeClasses = {
    small: "w-32",
    medium: "w-40 md:w-48",
    large: "w-52 md:w-64"
  };
  
  const imageSizeClasses = {
    small: "h-32 w-32",
    medium: "h-40 w-40 md:h-48 md:w-48",
    large: "h-52 w-52 md:h-64 md:w-64"
  };
  
  return (
    <Link to={`/playlists/${playlist.id}`} className={`${sizeClasses[size]} group`}>
      <div className="relative overflow-hidden">
        <div className={`${imageSizeClasses[size]} rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
          <img 
            src={playlist.coverImage} 
            alt={playlist.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-0 rounded-lg group-hover:opacity-30 transition-opacity"></div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Play className="h-5 w-5 ml-0.5" />
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-white group-hover:text-primary transition-colors truncate">
          {playlist.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {playlist.description}
        </p>
      </div>
    </Link>
  );
};

export default PlaylistCard;
