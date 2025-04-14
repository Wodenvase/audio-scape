
import { createContext, useState, useContext, ReactNode, useRef, useEffect } from "react";
import { Track, tracks } from "../data/musicData";
import { useToast } from "@/components/ui/use-toast";

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  queue: Track[];
  audioRef: React.RefObject<HTMLAudioElement>;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  addToQueue: (track: Track) => void;
  myPlaylists: UserPlaylist[];
  createPlaylist: (name: string) => void;
  addToPlaylist: (track: Track, playlistId: string) => void;
  removeFromPlaylist: (trackId: string, playlistId: string) => void;
}

export interface UserPlaylist {
  id: string;
  name: string;
  tracks: Track[];
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Track[]>([]);
  const [myPlaylists, setMyPlaylists] = useState<UserPlaylist[]>([
    { id: 'favorites', name: 'My Favorites', tracks: [] }
  ]);
  
  const { toast } = useToast();
  
  // Create a single audio element ref that persists for the lifetime of the app
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio element only once when the context is created
  useEffect(() => {
    // Only create the audio element if it doesn't already exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);
  
  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      const newQueue = queue.slice(1);
      setQueue(newQueue);
      playTrack(nextTrack);
    } else if (currentTrack) {
      const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
      if (currentIndex < tracks.length - 1) {
        playTrack(tracks[currentIndex + 1]);
      }
    }
  };
  
  // Ensure track changes work with the existing audio element
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (currentTrack) {
      audioRef.current.src = currentTrack.audioSrc;
      audioRef.current.load();
      if (isPlaying) audioRef.current.play();
    }
  }, [currentTrack]);
  
  // Handle play/pause state changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  
  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);
  
  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };
  
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  
  const previousTrack = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
      if (currentIndex > 0) {
        playTrack(tracks[currentIndex - 1]);
      }
    }
  };
  
  const addToQueue = (track: Track) => {
    setQueue([...queue, track]);
    toast({
      title: "Added to Queue",
      description: `${track.title} by ${track.artist} added to queue`,
    });
  };
  
  const createPlaylist = (name: string) => {
    const id = `playlist-${Date.now()}`;
    setMyPlaylists([...myPlaylists, { id, name, tracks: [] }]);
    toast({
      title: "Playlist Created",
      description: `${name} playlist has been created`,
    });
  };
  
  const addToPlaylist = (track: Track, playlistId: string) => {
    setMyPlaylists(myPlaylists.map(playlist => {
      if (playlist.id === playlistId) {
        // Check if track is already in playlist
        if (playlist.tracks.some(t => t.id === track.id)) {
          toast({
            title: "Already in Playlist",
            description: `${track.title} is already in ${playlist.name}`,
          });
          return playlist;
        }
        
        toast({
          title: "Added to Playlist",
          description: `${track.title} added to ${playlist.name}`,
        });
        return { ...playlist, tracks: [...playlist.tracks, track] };
      }
      return playlist;
    }));
  };
  
  const removeFromPlaylist = (trackId: string, playlistId: string) => {
    const playlist = myPlaylists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    setMyPlaylists(myPlaylists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist, 
          tracks: playlist.tracks.filter(track => track.id !== trackId)
        };
      }
      return playlist;
    }));
    
    toast({
      title: "Removed from Playlist",
      description: `Song removed from ${playlist.name}`,
    });
  };
  
  const value = {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    queue,
    audioRef,
    playTrack,
    togglePlayPause,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack,
    addToQueue,
    myPlaylists,
    createPlaylist,
    addToPlaylist,
    removeFromPlaylist,
  };
  
  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
