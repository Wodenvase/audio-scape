
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { genres, artists, albums, tracks } from "@/data/musicData";
import ArtistCard from "@/components/music/ArtistCard";
import AlbumCard from "@/components/music/AlbumCard";
import TrackCard from "@/components/music/TrackCard";
import { Button } from "@/components/ui/button";
import GenreCard from "@/components/music/GenreCard";

const ExplorePage = () => {
  const [activeTab, setActiveTab] = useState<"genres" | "artists" | "albums" | "tracks">("genres");
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "genres":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-1">
            {genres.map((genre) => (
              <GenreCard 
                key={genre.id} 
                id={genre.id} 
                name={genre.name} 
                color={genre.color} 
              />
            ))}
          </div>
        );
      case "artists":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-1">
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        );
      case "albums":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 p-1">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        );
      case "tracks":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} view="list" />
            ))}
          </div>
        );
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Explore</h1>
          
          <div className="flex space-x-2 bg-music-dark p-1 rounded-full">
            <Button
              variant={activeTab === "genres" ? "default" : "ghost"}
              className={`rounded-full ${activeTab === "genres" ? 'bg-primary' : ''}`}
              onClick={() => setActiveTab("genres")}
            >
              Genres
            </Button>
            <Button
              variant={activeTab === "artists" ? "default" : "ghost"}
              className={`rounded-full ${activeTab === "artists" ? 'bg-primary' : ''}`}
              onClick={() => setActiveTab("artists")}
            >
              Artists
            </Button>
            <Button
              variant={activeTab === "albums" ? "default" : "ghost"}
              className={`rounded-full ${activeTab === "albums" ? 'bg-primary' : ''}`}
              onClick={() => setActiveTab("albums")}
            >
              Albums
            </Button>
            <Button
              variant={activeTab === "tracks" ? "default" : "ghost"}
              className={`rounded-full ${activeTab === "tracks" ? 'bg-primary' : ''}`}
              onClick={() => setActiveTab("tracks")}
            >
              Tracks
            </Button>
          </div>
        </div>
        
        <div className="bg-music-dark/50 rounded-2xl p-6">
          {renderTabContent()}
        </div>
      </div>
    </MainLayout>
  );
};

export default ExplorePage;
