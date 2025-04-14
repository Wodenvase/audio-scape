
import { useParams, Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { artists, getAlbumsByArtist, getTracksByArtist } from "@/data/musicData";
import MainLayout from "@/components/layout/MainLayout";
import AlbumCard from "@/components/music/AlbumCard";
import TrackCard from "@/components/music/TrackCard";
import { Button } from "@/components/ui/button";

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useMusic();
  
  const artist = artists.find(a => a.id === id);
  
  if (!artist) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const albums = getAlbumsByArtist(artist.id);
  const tracks = getTracksByArtist(artist.id);
  
  const popularTracks = tracks.slice(0, 5);
  
  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0]);
    }
  };
  
  return (
    <MainLayout>
      {/* Artist hero section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-music-dark/80 to-background z-0">
          <div 
            className="w-full h-full opacity-30 blur-xl"
            style={{
              backgroundImage: `url(${artist.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10">
              <img
                src={artist.image}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm">
                  Artist
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                {artist.name}
              </h1>
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                {artist.genres.map((genre) => (
                  <span 
                    key={genre} 
                    className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button 
                  onClick={handlePlayAll}
                  className="rounded-full bg-primary hover:bg-primary/90 text-white px-8"
                >
                  <Play className="mr-2 h-5 w-5 ml-0.5" />
                  Play All
                </Button>
                
                <Button 
                  variant="outline" 
                  className="rounded-full border-white/20 text-white hover:bg-white/10 px-8"
                >
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Artist bio */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-300 max-w-3xl">{artist.bio}</p>
      </div>
      
      {/* Popular tracks */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Popular Tracks</h2>
        <div className="bg-white/5 rounded-xl p-4">
          {popularTracks.map((track, index) => (
            <TrackCard 
              key={track.id} 
              track={track} 
              index={index}
              showAlbum={true}
            />
          ))}
        </div>
      </div>
      
      {/* Albums */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default ArtistPage;
