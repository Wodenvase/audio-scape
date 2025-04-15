
import { motion } from "framer-motion";
import { Music, BarChart, Sparkles, Users, Smartphone } from "lucide-react";
import GlassCard from "@/components/ui/glass-card";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const KeyFeatures = () => {
  const features: FeatureItem[] = [
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "Audio Visualization System",
      description: "Experience music in a new dimension with our real-time audio visualizations that respond to every beat and melody."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Mood-based Recommendations",
      description: "Discover music that matches your current mood, with personalized recommendations that evolve with your preferences."
    },
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "Interactive Playlist Creator",
      description: "Design the perfect playlist with our intuitive drag-and-drop interface and AI-powered suggestions."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Artist Spotlight Features",
      description: "Explore in-depth profiles of your favorite artists, with exclusive content, upcoming events, and behind-the-scenes insights."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Cross-device Sync System",
      description: "Seamlessly transition your listening experience across all your devices, with real-time synchronization of playlists and preferences."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience music like never before with our innovative features
            designed to enhance your listening journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full p-8 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                <div className="mb-6 p-3 rounded-full bg-music-darker">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
