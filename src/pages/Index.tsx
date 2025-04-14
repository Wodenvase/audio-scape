
import MainLayout from "@/components/layout/MainLayout";
import MoodSelector from "@/components/home/MoodSelector";
import HeroSection from "@/components/home/HeroSection";
import { 
  FeaturedArtistsSection, 
  NewReleasesSection, 
  TopPlaylistsSection, 
  BrowseByGenreSection,
  FeaturedAlbumsSection
} from "@/components/home/HomeSections";
import { useMusic } from "@/context/MusicContext";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import { Music, Grid2X2 } from "lucide-react";

const Index = () => {
  const { currentTrack } = useMusic();
  const [viewMode, setViewMode] = useState<'mood' | 'browse'>('mood');

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-music-dark rounded-full p-1 flex">
            <Toggle
              pressed={viewMode === 'mood'}
              onPressedChange={() => setViewMode('mood')}
              className="rounded-full px-4 py-2 data-[state=on]:bg-primary/20"
            >
              <Music className="h-4 w-4 mr-2" />
              Mood
            </Toggle>
            <Toggle
              pressed={viewMode === 'browse'}
              onPressedChange={() => setViewMode('browse')}
              className="rounded-full px-4 py-2 data-[state=on]:bg-primary/20"
            >
              <Grid2X2 className="h-4 w-4 mr-2" />
              Browse
            </Toggle>
          </div>
        </div>

        {/* Content based on view mode */}
        {viewMode === 'mood' ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <MoodSelector />
          </div>
        ) : (
          <>
            <HeroSection />
            <FeaturedArtistsSection />
            <NewReleasesSection />
            <TopPlaylistsSection />
            <BrowseByGenreSection />
            <FeaturedAlbumsSection />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
