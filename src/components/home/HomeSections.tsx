
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { featuredContent, genres } from "@/data/musicData";
import ArtistCard from "../music/ArtistCard";
import AlbumCard from "../music/AlbumCard";
import TrackCard from "../music/TrackCard";
import PlaylistCard from "../music/PlaylistCard";
import GenreCard from "../music/GenreCard";

// Section Header Component
const SectionHeader = ({ title, link }: { title: string; link?: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-bold">{title}</h2>
    {link && (
      <Link to={link} className="text-sm text-primary flex items-center hover:underline">
        View All <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    )}
  </div>
);

// Featured Artists Section
export const FeaturedArtistsSection = () => (
  <section className="py-10">
    <div className="container mx-auto px-4">
      <SectionHeader title="Featured Artists" link="/artists" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {featuredContent.featuredArtists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  </section>
);

// New Releases Section
export const NewReleasesSection = () => (
  <section className="py-10 bg-music-dark rounded-3xl my-10">
    <div className="container mx-auto px-4">
      <SectionHeader title="New Releases" link="/albums" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredContent.newReleases.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  </section>
);

// Top Playlists Section
export const TopPlaylistsSection = () => (
  <section className="py-10">
    <div className="container mx-auto px-4">
      <SectionHeader title="Popular Playlists" link="/playlists" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredContent.topPlaylists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} size="large" />
        ))}
      </div>
    </div>
  </section>
);

// Browse by Genre Section
export const BrowseByGenreSection = () => (
  <section className="py-10">
    <div className="container mx-auto px-4">
      <SectionHeader title="Browse by Genre" link="/genres" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.slice(0, 8).map((genre) => (
          <GenreCard 
            key={genre.id} 
            id={genre.id} 
            name={genre.name} 
            color={genre.color} 
          />
        ))}
      </div>
    </div>
  </section>
);

// Featured Albums Section
export const FeaturedAlbumsSection = () => (
  <section className="py-10">
    <div className="container mx-auto px-4">
      <SectionHeader title="Featured Albums" link="/albums" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {featuredContent.featuredAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  </section>
);
