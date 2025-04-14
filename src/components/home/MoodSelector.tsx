
import { useState, useRef, useEffect } from "react";
import { useMusic } from "@/context/MusicContext";
import { tracks } from "@/data/musicData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Music, Sun, Moon, Heart, Zap, CloudRain 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Mood {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string;
  colors: string[];
  genres: string[];
}

const moods: Mood[] = [
  {
    id: "calm",
    name: "Calm",
    icon: <Moon className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
    colors: ["#60a5fa", "#4f46e5"],
    genres: ["Ambient", "Lo-fi", "Jazz"]
  },
  {
    id: "energetic",
    name: "Energetic",
    icon: <Zap className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-600",
    colors: ["#facc15", "#ea580c"],
    genres: ["Electronic", "Dance", "Pop"]
  },
  {
    id: "happy",
    name: "Happy",
    icon: <Sun className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-green-400 to-teal-600",
    colors: ["#4ade80", "#0d9488"],
    genres: ["Pop", "Synthwave"]
  },
  {
    id: "sad",
    name: "Melancholic",
    icon: <CloudRain className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-purple-400 to-pink-600",
    colors: ["#c084fc", "#db2777"],
    genres: ["R&B", "Soul"]
  },
  {
    id: "romantic",
    name: "Love",
    icon: <Heart className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-rose-400 to-red-600",
    colors: ["#fb7185", "#dc2626"],
    genres: ["R&B", "Soul", "Jazz"]
  }
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playTrack } = useMusic();
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.id);
    setIsTransitioning(true);
    
    // Short delay to allow for animation before playing
    setTimeout(() => {
      const moodTracks = tracks.filter(track => 
        mood.genres.includes(track.genre)
      );
      
      if (moodTracks.length > 0) {
        const randomTrack = moodTracks[Math.floor(Math.random() * moodTracks.length)];
        playTrack(randomTrack);
        
        toast({
          title: `${mood.name} Vibes`,
          description: `Now playing: ${randomTrack.title} by ${randomTrack.artist}`,
          duration: 3000,
        });
      } else {
        toast({
          title: "No tracks found",
          description: `We couldn't find any ${mood.name.toLowerCase()} tracks. Try another mood!`,
          variant: "destructive",
          duration: 3000,
        });
      }
      
      setIsTransitioning(false);
    }, 800);
  };

  // SVG blob paths for each mood button
  const blobPaths = {
    default: "M58.2,-48.2C70.6,-33.4,73.1,-9.4,66.4,10.5C59.7,30.4,43.8,46.3,24.4,55.8C5,65.2,-17.9,68.2,-35.8,59.5C-53.8,50.8,-66.7,30.4,-70.2,9C-73.7,-12.5,-67.7,-35,-53.3,-49.4C-38.9,-63.8,-16,-70.2,3.9,-73.4C23.8,-76.7,45.7,-63,58.2,-48.2Z",
    hover: "M54.3,-47.8C67.9,-29.9,75,-8,71.5,12.9C68,33.7,54,53.4,35.1,63.3C16.1,73.1,-7.9,73.1,-31.4,65C-54.9,56.9,-77.9,40.8,-83.5,20.3C-89.2,-0.2,-77.5,-25.1,-61.1,-43.2C-44.7,-61.3,-23.4,-72.7,-1.1,-71.8C21.1,-70.9,40.7,-65.8,54.3,-47.8Z",
    active: "M59.4,-49.2C71.5,-33.1,73,-8.2,67.3,15.2C61.7,38.6,48.9,60.5,29.1,70.7C9.4,80.9,-17.4,79.4,-41.4,68C-65.5,56.6,-86.8,35.3,-91.5,10.9C-96.1,-13.5,-84.2,-41,-65.1,-57.2C-46.1,-73.3,-23,-78.1,0.7,-78.8C24.4,-79.4,47.3,-65.2,59.4,-49.2Z"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <AnimatePresence>
        {!isTransitioning && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Music className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              What's Your Mood?
            </h1>
            <p className="text-gray-300 text-lg">
              Choose a vibe and let the music take you away
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {moods.map((mood) => (
          <motion.div
            key={mood.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood)}
            className={`
              relative 
              h-32 md:h-40
              rounded-xl 
              cursor-pointer
              overflow-hidden
              flex flex-col items-center justify-center
              ${selectedMood === mood.id ? "ring-4 ring-white/30" : ""}
            `}
          >
            {/* Glass background */}
            <div className="absolute inset-0 glass-effect"></div>
            
            {/* Animated blob background */}
            <motion.div 
              className="absolute inset-0 z-0 flex items-center justify-center"
              initial="default"
              whileHover="hover"
              whileTap="active"
            >
              <motion.svg 
                viewBox="0 0 200 200" 
                className="w-full h-full"
                style={{ filter: "blur(0px)" }}
              >
                <motion.path
                  d={blobPaths.default}
                  variants={{
                    default: { d: blobPaths.default },
                    hover: { d: blobPaths.hover },
                    active: { d: blobPaths.active }
                  }}
                  transition={{ 
                    type: "spring", 
                    damping: 10, 
                    stiffness: 100 
                  }}
                  fill={`url(#gradient-${mood.id})`}
                />
                <defs>
                  <linearGradient id={`gradient-${mood.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={mood.colors[0]} />
                    <stop offset="100%" stopColor={mood.colors[1]} />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
            
            {/* Icon and text */}
            <div className="relative z-10 flex flex-col items-center space-y-2">
              <motion.div 
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm"
                whileHover={{ 
                  boxShadow: `0 0 20px ${mood.colors[0]}80`
                }}
              >
                {mood.icon}
              </motion.div>
              <span className="text-white font-medium text-sm md:text-base">
                {mood.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
