
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { playlists, getTracksByPlaylist } from "@/data/musicData";
import TrackCard from "@/components/music/TrackCard";
import PlaylistCard from "@/components/music/PlaylistCard";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMusic } from "@/context/MusicContext";

const PlaylistsPage = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToQueue } = useMusic();
  
  // Get tracks for the selected playlist
  const playlistTracks = selectedPlaylist 
    ? getTracksByPlaylist(selectedPlaylist)
    : [];
  
  // Filter playlists by search query
  const filteredPlaylists = playlists.filter((playlist) => 
    playlist.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get the selected playlist data
  const currentPlaylist = playlists.find(p => p.id === selectedPlaylist);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold">Playlists</h1>
          
          <div className="relative w-full md:w-auto">
            <Input
              placeholder="Search playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full md:w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {selectedPlaylist ? (
          <>
            <Button 
              variant="outline" 
              onClick={() => setSelectedPlaylist(null)}
              className="mb-4"
            >
              Back to all playlists
            </Button>
            
            {currentPlaylist && (
              <div className="mb-8">
                <div className="flex gap-6 items-center">
                  <div className="w-40 h-40 rounded-lg overflow-hidden">
                    <img 
                      src={currentPlaylist.coverImage} 
                      alt={currentPlaylist.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{currentPlaylist.title}</h2>
                    <p className="text-gray-400 mt-2">{currentPlaylist.description}</p>
                    <p className="text-gray-400 mt-2">{playlistTracks.length} songs</p>
                  </div>
                </div>
              </div>
            )}
            
            <GlassCard className="p-4">
              <h3 className="text-xl font-bold mb-4">Tracks</h3>
              {playlistTracks.length > 0 ? (
                playlistTracks.map((track, index) => (
                  <TrackCard 
                    key={track.id} 
                    track={track} 
                    index={index}
                    showAlbum={true}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No tracks in this playlist</p>
                </div>
              )}
            </GlassCard>
          </>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaylists.map((playlist) => (
              <div key={playlist.id} onClick={() => setSelectedPlaylist(playlist.id)}>
                <PlaylistCard playlist={playlist} size="large" />
              </div>
            ))}
            
            <GlassCard className="flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-white/5 transition">
              <Button variant="outline" className="rounded-full w-16 h-16 mb-4">
                <Plus className="h-8 w-8" />
              </Button>
              <h3 className="text-xl font-medium">Create Playlist</h3>
            </GlassCard>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PlaylistsPage;
