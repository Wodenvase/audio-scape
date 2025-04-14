
import { Link } from "react-router-dom";
import { Search, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
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
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
          <Link to="/artists" className="hover:text-primary transition-colors">Artists</Link>
          <Link to="/playlists" className="hover:text-primary transition-colors">Playlists</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
