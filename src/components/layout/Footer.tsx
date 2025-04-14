
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-music-darker py-12 px-4 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-primary text-lg font-bold mb-4">AudioScape</h3>
            <p className="text-sm text-gray-400">
              Explore the immersive world of music with interactive visualizations and personalized recommendations.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/docs/help" className="text-gray-400 hover:text-primary">Help Center</Link></li>
              <li><Link to="/docs" className="text-gray-400 hover:text-primary">Documentation</Link></li>
              <li><Link to="/docs/features" className="text-gray-400 hover:text-primary">Features Guide</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary">Terms of Use</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AudioScape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
