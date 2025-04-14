
import { useParams, Link } from "react-router-dom";
import { Play, Pause } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { albums, getTracksByAlbum } from "@/data/musicData";
import MainLayout from "@/components/layout/MainLayout";
import TrackCard from "@/components/music/TrackCard";
import { Button } from "@/components/ui/button";

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useMusic();
  
  const album = albums.find(a => a.id === id);
  
  if (!album) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Album not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to home
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const tracks = getTracksByAlbum(album.id);
  
  const isAlbumPlaying = isPlaying && currentTrack && tracks.some(t => t.id === currentTrack.id);
  
  const handlePlayAlbum = () => {
    if (tracks.length > 0) {
      playTrack(tracks[0]);
    }
  };
  
  return (
    <MainLayout>
      {/* Album hero section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-music-dark/80 to-background z-0">
          <div 
            className="w-full h-full opacity-30 blur-xl"
            style={{
              backgroundImage: `url(${album.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-64 h-64 shadow-xl rounded-lg overflow-hidden">
              <img
                src={album.coverImage}
                alt={album.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm">
                  Album
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {album.title}
              </h1>
              <Link to={`/artists/${album.artistId}`} className="text-xl text-primary hover:underline mb-2 block">
                {album.artist}
              </Link>
              <p className="text-gray-300 mb-4">
                {album.releaseYear} • {album.genre} • {tracks.length} songs
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button 
                  onClick={handlePlayAlbum}
                  className="rounded-full bg-primary hover:bg-primary/90 text-white px-8"
                >
                  {isAlbumPlaying ? (
                    <>
                      <Pause className="mr-2 h-5 w-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5 ml-0.5" />
                      Play
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="rounded-full border-white/20 text-white hover:bg-white/10 px-8"
                >
                  Save to Library
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tracks */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/5 rounded-xl p-4">
          {tracks.map((track, index) => (
            <TrackCard 
              key={track.id} 
              track={track} 
              index={index} 
              showAlbum={false}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AlbumPage;
