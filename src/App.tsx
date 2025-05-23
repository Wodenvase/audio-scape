
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./context/MusicContext";

import Index from "./pages/Index";
import ArtistPage from "./pages/ArtistPage";
import AlbumPage from "./pages/AlbumPage";
import ExplorePage from "./pages/ExplorePage";
import PlaylistsPage from "./pages/PlaylistsPage";
import NotFound from "./pages/NotFound";
import DocumentationPage from "./pages/DocumentationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MusicProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/artists/:id" element={<ArtistPage />} />
            <Route path="/albums/:id" element={<AlbumPage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/playlists/:id" element={<PlaylistsPage />} />
            <Route path="/docs" element={<DocumentationPage />} />
            <Route path="/docs/:section" element={<DocumentationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </MusicProvider>
  </QueryClientProvider>
);

export default App;
