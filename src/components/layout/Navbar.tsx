
import { Link, useLocation } from "react-router-dom";
import { Search, Music, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useMusic } from "@/context/MusicContext";
import { tracks } from "@/data/musicData";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { playTrack } = useMusic();
  const location = useLocation();
  const { toast } = useToast();
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery("");
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      const results = tracks.filter(track => 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (results.length > 0) {
        playTrack(results[0]);
        toast({
          title: "Track found!",
          description: `Now playing "${results[0].title}" by ${results[0].artist}`,
        });
      } else {
        toast({
          title: "No results found",
          description: "Try searching for a different song or artist.",
          variant: "destructive"
        });
      }
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path ? "text-primary" : "text-white";
  };
  
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-4 backdrop-blur-md bg-background/80 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <div className="flex h-8 items-center justify-center gap-[2px]">
              <div className="audio-bar h-4"></div>
              <div className="audio-bar h-5"></div>
              <div className="audio-bar h-6"></div>
              <div className="audio-bar h-4"></div>
              <div className="audio-bar h-3"></div>
            </div>
            AudioScape
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className={`hover:text-primary transition-colors ${isActive('/')}`}>Home</Link>
          <Link to="/explore" className={`hover:text-primary transition-colors ${isActive('/explore')}`}>Explore</Link>
          <Link to="/playlists" className={`hover:text-primary transition-colors ${isActive('/playlists')}`}>Playlists</Link>
          <Link to="/docs" className={`hover:text-primary transition-colors ${isActive('/docs')}`}>Docs</Link>
        </div>
        
        <div className="flex items-center gap-4">
          {showSearch ? (
            <form onSubmit={handleSearch} className="relative">
              <Input
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-white/5 border-white/10"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          ) : (
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full">
            <Music className="h-5 w-5" />
          </Button>
          <Link to="/docs">
            <Button variant="ghost" size="icon" className="rounded-full">
              <BookOpen className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
