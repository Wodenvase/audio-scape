
import { Link } from "react-router-dom";
import { Album } from "@/data/musicData";

interface AlbumCardProps {
  album: Album;
  size?: "small" | "medium" | "large";
}

const AlbumCard = ({ album, size = "medium" }: AlbumCardProps) => {
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
    <Link to={`/albums/${album.id}`} className={`${sizeClasses[size]} group`}>
      <div className="relative overflow-hidden">
        <div className={`${imageSizeClasses[size]} rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
          <img 
            src={album.coverImage} 
            alt={album.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-0 rounded-lg group-hover:opacity-20 transition-opacity"></div>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-white group-hover:text-primary transition-colors truncate">
          {album.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1 truncate">
          {album.artist} • {album.releaseYear}
        </p>
      </div>
    </Link>
  );
};

export default AlbumCard;
