
import { useState } from "react";
import { useMusic } from "@/context/MusicContext";
import { tracks } from "@/data/musicData";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Music, Sun, Moon, Heart, Zap, CloudRain } from "lucide-react";

interface Mood {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  genres: string[];
}

const moods: Mood[] = [
  {
    id: "calm",
    name: "Calm",
    icon: <Moon className="h-6 w-6" />,
    color: "bg-blue-500",
    genres: ["Ambient", "Lo-fi", "Jazz"]
  },
  {
    id: "energetic",
    name: "Energetic",
    icon: <Zap className="h-6 w-6" />,
    color: "bg-yellow-500",
    genres: ["Electronic", "Dance", "Pop"]
  },
  {
    id: "happy",
    name: "Happy",
    icon: <Sun className="h-6 w-6" />,
    color: "bg-orange-500",
    genres: ["Pop", "Synthwave"]
  },
  {
    id: "sad",
    name: "Sad",
    icon: <CloudRain className="h-6 w-6" />,
    color: "bg-indigo-500",
    genres: ["R&B", "Soul"]
  },
  {
    id: "romantic",
    name: "Romantic",
    icon: <Heart className="h-6 w-6" />,
    color: "bg-pink-500",
    genres: ["R&B", "Soul", "Jazz"]
  }
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { playTrack } = useMusic();
  const { toast } = useToast();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.id);
    
    // Find tracks matching the mood's genres
    const moodTracks = tracks.filter(track => 
      mood.genres.includes(track.genre)
    );
    
    if (moodTracks.length > 0) {
      // Play a random track from the filtered list
      const randomTrack = moodTracks[Math.floor(Math.random() * moodTracks.length)];
      playTrack(randomTrack);
      
      toast({
        title: `Playing ${mood.name} Music`,
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
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-10">
        <Music className="h-16 w-16 mx-auto mb-4 text-primary" />
        <h1 className="text-3xl font-bold mb-2">How are you feeling today?</h1>
        <p className="text-gray-400">Select a mood to start listening</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-xl">
        {moods.map((mood) => (
          <Button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            className={`h-24 flex flex-col items-center justify-center gap-2 ${mood.color} hover:opacity-90 transition-all ${
              selectedMood === mood.id ? "ring-4 ring-white/30" : ""
            }`}
          >
            {mood.icon}
            <span>{mood.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
