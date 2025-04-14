
import { useState } from "react";
import { useMusic } from "@/context/MusicContext";
import { tracks } from "@/data/musicData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Music, Sun, Moon, Heart, Zap, CloudRain 
} from "lucide-react";

interface Mood {
  id: string;
  name: string;
  icon: React.ReactNode;
  gradient: string;
  genres: string[];
}

const moods: Mood[] = [
  {
    id: "calm",
    name: "Calm",
    icon: <Moon className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-blue-400 to-indigo-600",
    genres: ["Ambient", "Lo-fi", "Jazz"]
  },
  {
    id: "energetic",
    name: "Energetic",
    icon: <Zap className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-yellow-400 to-orange-600",
    genres: ["Electronic", "Dance", "Pop"]
  },
  {
    id: "happy",
    name: "Happy",
    icon: <Sun className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-green-400 to-teal-600",
    genres: ["Pop", "Synthwave"]
  },
  {
    id: "sad",
    name: "Melancholic",
    icon: <CloudRain className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-purple-400 to-pink-600",
    genres: ["R&B", "Soul"]
  },
  {
    id: "romantic",
    name: "Love",
    icon: <Heart className="h-8 w-8 text-white" />,
    gradient: "bg-gradient-to-br from-rose-400 to-red-600",
    genres: ["R&B", "Soul", "Jazz"]
  }
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { playTrack } = useMusic();
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.id);
    
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
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-12">
        <Music className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
          What's Your Mood?
        </h1>
        <p className="text-gray-300 text-lg">
          Choose a vibe and let the music take you away
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {moods.map((mood) => (
          <Button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            className={`
              ${mood.gradient} 
              h-32 md:h-40 
              flex flex-col items-center justify-center 
              gap-3 
              rounded-xl 
              shadow-lg 
              hover:scale-105 
              transition-transform 
              ${selectedMood === mood.id ? "ring-4 ring-white/30" : ""}
            `}
          >
            {mood.icon}
            <span className="text-white font-medium text-sm md:text-base">
              {mood.name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
