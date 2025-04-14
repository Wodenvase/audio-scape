
import { useState, useRef, useEffect } from "react";
import { useMusic } from "@/context/MusicContext";
import { tracks } from "@/data/musicData";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  // SVG blob paths for each mood button with more complex morphing shapes
  const blobPaths = {
    default: "M59.5,-47.2C72,-33.5,74.1,-8.3,67.3,12.3C60.6,32.9,45,49,26.3,59.7C7.6,70.4,-14.1,75.8,-32.9,67.8C-51.7,59.8,-67.5,38.5,-72,14.7C-76.5,-9.1,-69.8,-35.4,-54.7,-49.8C-39.6,-64.3,-16.1,-66.8,4.2,-70.2C24.5,-73.5,47,-60.8,59.5,-47.2Z",
    hover: "M50.7,-44.9C65.4,-31.2,77.2,-12.4,75.5,5.6C73.7,23.5,58.4,40.7,40.1,52.5C21.9,64.3,0.6,70.8,-20,66.9C-40.6,63,-60.5,48.8,-68.4,29.7C-76.3,10.6,-72.1,-13.3,-61,-31.7C-49.9,-50.1,-31.9,-63,-12.7,-62.9C6.5,-62.8,36,-58.7,50.7,-44.9Z",
    active: "M64.3,-53.6C77.8,-35.9,79.5,-9,72.6,13.9C65.7,36.8,50.2,55.7,29.8,66.1C9.4,76.5,-16,78.3,-37.9,68.8C-59.8,59.2,-78.1,38.3,-82.2,14.8C-86.4,-8.8,-76.3,-35,-58.8,-52.8C-41.3,-70.6,-16.3,-79.9,5.5,-83.8C27.4,-87.7,50.7,-71.2,64.3,-53.6Z"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
      {/* Background blobs that follow mouse position with parallax effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-20 bg-gradient-to-r from-blue-500 to-purple-600 filter blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 50 }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full opacity-10 bg-gradient-to-r from-pink-500 to-yellow-500 filter blur-3xl"
          animate={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ type: "spring", damping: 50 }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 bg-gradient-to-r from-green-400 to-cyan-500 filter blur-3xl"
          animate={{
            x: mousePosition.x * 0.015,
            y: mousePosition.y * 0.015,
          }}
          transition={{ type: "spring", damping: 50 }}
        />
      </div>
      
      <AnimatePresence>
        {!isTransitioning && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
              }}
            >
              <Music className="h-16 w-16 mx-auto mb-4 text-primary" />
            </motion.div>
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-2 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              What's Your Mood?
            </motion.h1>
            <motion.p 
              className="text-gray-300 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Choose a vibe and let the music take you away
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl relative z-10">
        {moods.map((mood, index) => (
          <motion.div
            key={mood.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleMoodSelect(mood)}
            className={`
              relative 
              h-36 md:h-44
              rounded-2xl 
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
                className="w-full h-full absolute inset-0"
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
                    stiffness: 100,
                    duration: 0.8
                  }}
                  fill={`url(#gradient-${mood.id})`}
                  className="animate-blob"
                />
                <defs>
                  <linearGradient id={`gradient-${mood.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={mood.colors[0]} />
                    <stop offset="100%" stopColor={mood.colors[1]} />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
            
            {/* Glow effect on hover */}
            <motion.div 
              className="absolute inset-0 opacity-0 pointer-events-none"
              whileHover={{ opacity: 1 }}
              style={{
                background: `radial-gradient(circle at center, ${mood.colors[0]}40 0%, transparent 70%)`,
              }}
            />
            
            {/* Icon and text */}
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <motion.div 
                className="p-4 rounded-full bg-white/10 backdrop-blur-md"
                whileHover={{ 
                  boxShadow: `0 0 30px ${mood.colors[0]}80`,
                  scale: 1.1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {mood.icon}
              </motion.div>
              <span className="text-white font-medium text-lg md:text-xl tracking-wide">
                {mood.name}
              </span>
            </div>
            
            {/* Ripple effect on click */}
            <motion.div
              initial={{ scale: 0, x: "-50%", y: "-50%" }}
              animate={selectedMood === mood.id ? { scale: 3 } : { scale: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute left-1/2 top-1/2 w-full aspect-square rounded-full bg-white/20 pointer-events-none"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
