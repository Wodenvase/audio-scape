
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
import { useState, useEffect, useRef } from "react";
import { Music, Grid2X2 } from "lucide-react";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/glass-card";

const Index = () => {
  const { currentTrack, isPlaying } = useMusic();
  const [viewMode, setViewMode] = useState<'mood' | 'browse'>('mood');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Ref for the background container
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to container center
      const x = (clientX - left - width / 2) / width;
      const y = (clientY - top - height / 2) / height;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <MainLayout>
      <div 
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
      >
        {/* Parallax background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Background shapes that move with mouse and pulse with music */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-500/20 filter blur-3xl"
            style={{ 
              x: mousePosition.x * -30,
              y: mousePosition.y * -30,
              scale: isPlaying ? 1.05 : 1
            }}
            animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
            transition={isPlaying ? { repeat: Infinity, duration: 2 } : {}}
          />
          
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-blue-500/20 filter blur-3xl"
            style={{ 
              x: mousePosition.x * 30,
              y: mousePosition.y * 30,
              scale: isPlaying ? 1.1 : 1
            }}
            animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
            transition={isPlaying ? { repeat: Infinity, duration: 2.5, delay: 0.5 } : {}}
          />
          
          <motion.div 
            className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-teal-500/20 filter blur-3xl"
            style={{ 
              x: mousePosition.x * 20,
              y: mousePosition.y * -20,
              scale: isPlaying ? 1.08 : 1
            }}
            animate={isPlaying ? { scale: [1, 1.08, 1] } : {}}
            transition={isPlaying ? { repeat: Infinity, duration: 3 } : {}}
          />
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* View Toggle - Now positioned fixed to stay visible regardless of view mode */}
          <motion.div 
            className="flex justify-center mb-8 sticky top-24 z-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-1 flex">
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
            </GlassCard>
          </motion.div>

          {/* Content based on view mode - Both wrapped in their own motion.div containers */}
          <div className="relative">
            {viewMode === 'mood' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-[60vh] flex items-center justify-center"
              >
                <MoodSelector />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HeroSection />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <FeaturedArtistsSection />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <NewReleasesSection />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <TopPlaylistsSection />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <BrowseByGenreSection />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <FeaturedAlbumsSection />
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
