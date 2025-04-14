
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MusicPlayer from "../music/MusicPlayer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-24">
        {children}
      </main>
      <MusicPlayer />
      <Footer />
    </div>
  );
};

export default MainLayout;
