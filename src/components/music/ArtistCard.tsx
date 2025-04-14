
import { Link } from "react-router-dom";
import { Artist } from "@/data/musicData";

interface ArtistCardProps {
  artist: Artist;
  size?: "small" | "medium" | "large";
}

const ArtistCard = ({ artist, size = "medium" }: ArtistCardProps) => {
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
    <Link to={`/artists/${artist.id}`} className={`${sizeClasses[size]} group`}>
      <div className="relative overflow-hidden">
        <div className={`${imageSizeClasses[size]} rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
          <img 
            src={artist.image} 
            alt={artist.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-0 rounded-full group-hover:opacity-20 transition-opacity"></div>
      </div>
      <div className="mt-3 text-center">
        <h3 className="font-medium text-white group-hover:text-primary transition-colors">
          {artist.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {artist.genres.slice(0, 2).join(" • ")}
        </p>
      </div>
    </Link>
  );
};

export default ArtistCard;
