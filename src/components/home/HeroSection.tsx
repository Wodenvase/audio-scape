
import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { Button } from "@/components/ui/button";
import { featuredContent } from "@/data/musicData";

const HeroSection = () => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useMusic();
  const [background, setBackground] = useState<number>(1);
  
  const heroTrack = featuredContent.heroTrack;
  const isHeroTrack = currentTrack?.id === heroTrack.id;
  
  const handlePlay = () => {
    if (isHeroTrack) {
      togglePlayPause();
    } else {
      playTrack(heroTrack);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBackground((prev) => (prev === 3 ? 1 : prev + 1));
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden -mt-24">
      <div className="absolute inset-0 z-0">
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            background === 1 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            background === 2 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            background === 3 ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1614613535308-eb5fbd847f3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>
      
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-end pb-16 px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-2xl animate-bounce-slow">
            <img
              src={heroTrack.coverImage}
              alt={heroTrack.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm backdrop-blur-sm">
                Featured Track
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {heroTrack.title}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
              {heroTrack.artist}
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handlePlay}
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 py-6"
                size="lg"
              >
                {isHeroTrack && isPlaying ? (
                  <Pause className="mr-2 h-5 w-5" />
                ) : (
                  <Play className="mr-2 h-5 w-5 ml-0.5" />
                )}
                {isHeroTrack && isPlaying ? "Pause" : "Play Now"}
              </Button>
              
              <Button variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 px-8 py-6" size="lg">
                Explore Artist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
