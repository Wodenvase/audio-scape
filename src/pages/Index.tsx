
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import { 
  FeaturedArtistsSection, 
  NewReleasesSection, 
  TopPlaylistsSection, 
  BrowseByGenreSection,
  FeaturedAlbumsSection
} from "@/components/home/HomeSections";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedArtistsSection />
      <NewReleasesSection />
      <TopPlaylistsSection />
      <BrowseByGenreSection />
      <FeaturedAlbumsSection />
    </MainLayout>
  );
};

export default Index;
