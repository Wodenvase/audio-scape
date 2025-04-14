
import MainLayout from "@/components/layout/MainLayout";
import { Separator } from "@/components/ui/separator";
import { BookOpen, FileText, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const DocumentationPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Documentation</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="sticky top-24 space-y-6">
              <h2 className="text-2xl font-bold">Contents</h2>
              <nav className="space-y-2">
                <Link to="/docs" className="flex items-center gap-2 text-primary hover:underline">
                  <BookOpen className="w-4 h-4" />
                  <span>Overview</span>
                </Link>
                <Link to="/docs/features" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Features</span>
                </Link>
                <Link to="/docs/help" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help Guide</span>
                </Link>
                <Link to="/docs/about" className="flex items-center gap-2 text-gray-300 hover:text-primary transition-colors">
                  <Info className="w-4 h-4" />
                  <span>About AudioScape</span>
                </Link>
              </nav>
            </div>
          </div>
          
          <div className="col-span-2 space-y-12">
            <section id="overview" className="space-y-4">
              <h2 className="text-3xl font-bold">AudioScape Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                AudioScape is a modern music streaming platform that combines high-quality audio playback with 
                interactive visualizations to create an immersive listening experience. Our platform is designed 
                to help you discover new music, create personalized playlists, and enjoy your favorite tracks with 
                enhanced visual effects.
              </p>
              
              <div className="bg-white/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Browse our collection of tracks on the <Link to="/explore" className="text-primary hover:underline">Explore page</Link></li>
                  <li>Create your own playlists on the <Link to="/playlists" className="text-primary hover:underline">Playlists page</Link></li>
                  <li>Search for your favorite artists, albums, or tracks using the search function in the navigation bar</li>
                  <li>Enjoy interactive visualizations while your music plays</li>
                </ol>
              </div>
            </section>
            
            <Separator className="bg-white/10" />
            
            <section id="features" className="space-y-4">
              <h2 className="text-3xl font-bold">Key Features</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">Interactive Visualizations</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Experience your music visually with our real-time audio visualizations that respond to the 
                    frequency and amplitude of the tracks you're playing.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Personalized Playlists</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Create and customize your own playlists, adding tracks from our diverse library to match 
                    any mood or occasion.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">Mood-Based Recommendations</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Let us suggest tracks based on your current mood using our intuitive mood selector on the home page.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold">High-Quality Audio</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Enjoy crystal clear sound with our high-fidelity audio streaming technology.
                  </p>
                </div>
              </div>
            </section>
            
            <Separator className="bg-white/10" />
            
            <section id="keyboard-shortcuts" className="space-y-4">
              <h2 className="text-3xl font-bold">Keyboard Shortcuts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Play/Pause</span>
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">Space</kbd>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Next Track</span>
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">N</kbd>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Previous Track</span>
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">P</kbd>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Toggle Visualizer</span>
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">V</kbd>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentationPage;
