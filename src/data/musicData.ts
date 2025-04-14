
export interface Artist {
  id: string;
  name: string;
  image: string;
  genres: string[];
  bio: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverImage: string;
  releaseYear: number;
  genre: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  coverImage: string;
  audioSrc: string;
  duration: number;
  genre: string;
}

export interface Playlist {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  tracks: string[];
}

export const artists: Artist[] = [
  {
    id: "artist1",
    name: "Luna Echo",
    image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    genres: ["Electronic", "Ambient", "Downtempo"],
    bio: "Luna Echo is an electronic music producer known for creating atmospheric soundscapes that blend ambient textures with downtempo beats."
  },
  {
    id: "artist2",
    name: "Neon Pulse",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    genres: ["Synthwave", "Electronic", "Retrowave"],
    bio: "Neon Pulse creates nostalgic synthwave tracks inspired by 80s film soundtracks and retro gaming, characterized by bright arpeggios and driving beats."
  },
  {
    id: "artist3",
    name: "Midnight Voyage",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    genres: ["Chillhop", "Jazz", "Lo-fi"],
    bio: "Midnight Voyage blends elements of jazz, hip-hop, and lo-fi to create relaxing instrumental tracks perfect for late-night listening sessions."
  },
  {
    id: "artist4",
    name: "Crystal Skies",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    genres: ["Pop", "Electronic", "Dance"],
    bio: "Crystal Skies is a pop electronic duo creating uplifting anthems with soaring vocals and energetic production."
  },
  {
    id: "artist5",
    name: "Quantum Fields",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd847f3a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    genres: ["Techno", "Minimal", "Experimental"],
    bio: "Quantum Fields explores the boundaries of techno with experimental sounds and minimal compositions inspired by scientific concepts."
  },
  {
    id: "artist6",
    name: "Velvet Dream",
    image: "https://images.unsplash.com/photo-1598387993450-c75d53c848b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    genres: ["R&B", "Soul", "Trip-hop"],
    bio: "Velvet Dream brings smooth vocals over lush, atmospheric production, blending R&B and trip-hop into a modern sound."
  }
];

export const albums: Album[] = [
  {
    id: "album1",
    title: "Lunar Phases",
    artist: "Luna Echo",
    artistId: "artist1",
    coverImage: "https://images.unsplash.com/photo-1557672199-6e8c8b2b8fff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2023,
    genre: "Electronic"
  },
  {
    id: "album2",
    title: "Retrograde",
    artist: "Neon Pulse",
    artistId: "artist2",
    coverImage: "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2022,
    genre: "Synthwave"
  },
  {
    id: "album3",
    title: "Late Night Sessions",
    artist: "Midnight Voyage",
    artistId: "artist3",
    coverImage: "https://images.unsplash.com/photo-1593359863503-f598684c806f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2023,
    genre: "Lo-fi"
  },
  {
    id: "album4",
    title: "Horizon",
    artist: "Crystal Skies",
    artistId: "artist4",
    coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2022,
    genre: "Pop"
  },
  {
    id: "album5",
    title: "Particle Theory",
    artist: "Quantum Fields",
    artistId: "artist5",
    coverImage: "https://images.unsplash.com/photo-1502277254272-c60d7a14d461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2023,
    genre: "Techno"
  },
  {
    id: "album6",
    title: "Midnight Whispers",
    artist: "Velvet Dream",
    artistId: "artist6",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2022,
    genre: "R&B"
  },
  {
    id: "album7",
    title: "Aurora",
    artist: "Luna Echo",
    artistId: "artist1",
    coverImage: "https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2021,
    genre: "Ambient"
  },
  {
    id: "album8",
    title: "Digital Dreams",
    artist: "Neon Pulse",
    artistId: "artist2",
    coverImage: "https://images.unsplash.com/photo-1561303009-3f571815e273?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    releaseYear: 2023,
    genre: "Electronic"
  }
];

export const tracks: Track[] = [
  {
    id: "track1",
    title: "Moonlight Journey",
    artist: "Luna Echo",
    artistId: "artist1",
    album: "Lunar Phases",
    albumId: "album1",
    coverImage: "https://images.unsplash.com/photo-1557672199-6e8c8b2b8fff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    duration: 241,
    genre: "Electronic"
  },
  {
    id: "track2",
    title: "Cosmic Waves",
    artist: "Luna Echo",
    artistId: "artist1",
    album: "Lunar Phases",
    albumId: "album1",
    coverImage: "https://images.unsplash.com/photo-1557672199-6e8c8b2b8fff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    duration: 317,
    genre: "Ambient"
  },
  {
    id: "track3",
    title: "Neon Streets",
    artist: "Neon Pulse",
    artistId: "artist2",
    album: "Retrograde",
    albumId: "album2",
    coverImage: "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    duration: 278,
    genre: "Synthwave"
  },
  {
    id: "track4",
    title: "Retro Arcade",
    artist: "Neon Pulse",
    artistId: "artist2",
    album: "Retrograde",
    albumId: "album2",
    coverImage: "https://images.unsplash.com/photo-1528148343865-51218c4a13e6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    duration: 205,
    genre: "Synthwave"
  },
  {
    id: "track5",
    title: "Jazz Cafe",
    artist: "Midnight Voyage",
    artistId: "artist3",
    album: "Late Night Sessions",
    albumId: "album3",
    coverImage: "https://images.unsplash.com/photo-1593359863503-f598684c806f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    duration: 187,
    genre: "Jazz"
  },
  {
    id: "track6",
    title: "Northern Lights",
    artist: "Crystal Skies",
    artistId: "artist4",
    album: "Horizon",
    albumId: "album4",
    coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    duration: 215,
    genre: "Pop"
  },
  {
    id: "track7",
    title: "Quantum Leap",
    artist: "Quantum Fields",
    artistId: "artist5",
    album: "Particle Theory",
    albumId: "album5",
    coverImage: "https://images.unsplash.com/photo-1502277254272-c60d7a14d461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    duration: 298,
    genre: "Techno"
  },
  {
    id: "track8",
    title: "Midnight Serenade",
    artist: "Velvet Dream",
    artistId: "artist6",
    album: "Midnight Whispers",
    albumId: "album6",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    duration: 262,
    genre: "R&B"
  },
  {
    id: "track9",
    title: "Aurora Borealis",
    artist: "Luna Echo",
    artistId: "artist1",
    album: "Aurora",
    albumId: "album7",
    coverImage: "https://images.unsplash.com/photo-1574155376612-bfa4ed8aabfd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    duration: 324,
    genre: "Ambient"
  },
  {
    id: "track10",
    title: "Digital Sunset",
    artist: "Neon Pulse",
    artistId: "artist2",
    album: "Digital Dreams",
    albumId: "album8",
    coverImage: "https://images.unsplash.com/photo-1561303009-3f571815e273?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    duration: 193,
    genre: "Electronic"
  }
];

export const genres = [
  { id: "electronic", name: "Electronic", color: "bg-violet-500" },
  { id: "ambient", name: "Ambient", color: "bg-blue-500" },
  { id: "downtempo", name: "Downtempo", color: "bg-indigo-500" },
  { id: "synthwave", name: "Synthwave", color: "bg-pink-500" },
  { id: "retrowave", name: "Retrowave", color: "bg-purple-500" },
  { id: "chillhop", name: "Chillhop", color: "bg-green-500" },
  { id: "jazz", name: "Jazz", color: "bg-yellow-500" },
  { id: "lofi", name: "Lo-fi", color: "bg-amber-500" },
  { id: "pop", name: "Pop", color: "bg-red-500" },
  { id: "dance", name: "Dance", color: "bg-cyan-500" },
  { id: "techno", name: "Techno", color: "bg-emerald-500" },
  { id: "minimal", name: "Minimal", color: "bg-teal-500" },
  { id: "experimental", name: "Experimental", color: "bg-lime-500" },
  { id: "rnb", name: "R&B", color: "bg-orange-500" },
  { id: "soul", name: "Soul", color: "bg-amber-600" },
  { id: "triphop", name: "Trip-hop", color: "bg-fuchsia-500" }
];

export const playlists: Playlist[] = [
  {
    id: "playlist1",
    title: "Chill Electronic Vibes",
    coverImage: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Perfect for relaxed listening sessions with ambient electronic tracks.",
    tracks: ["track1", "track2", "track9"]
  },
  {
    id: "playlist2",
    title: "Retro Synthwave Mix",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Travel back to the 80s with these nostalgic synthwave tracks.",
    tracks: ["track3", "track4", "track10"]
  },
  {
    id: "playlist3",
    title: "Late Night Jazz",
    coverImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Smooth jazz and lo-fi beats for late night listening.",
    tracks: ["track5", "track8"]
  },
  {
    id: "playlist4",
    title: "Upbeat Favorites",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    description: "Energetic tracks to boost your mood.",
    tracks: ["track6", "track7", "track3"]
  }
];

export const featuredContent = {
  heroTrack: tracks[0],
  featuredArtists: [artists[0], artists[1], artists[2], artists[3]],
  featuredAlbums: [albums[0], albums[1], albums[2], albums[3]],
  newReleases: [albums[0], albums[4], albums[7]],
  topPlaylists: [playlists[0], playlists[1], playlists[3]],
};

export const formatTime = (time: number): string => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  return '0:00';
};

export const getTracksByGenre = (genreName: string): Track[] => {
  return tracks.filter(track => track.genre.toLowerCase() === genreName.toLowerCase());
};

export const getAlbumsByArtist = (artistId: string): Album[] => {
  return albums.filter(album => album.artistId === artistId);
};

export const getTracksByArtist = (artistId: string): Track[] => {
  return tracks.filter(track => track.artistId === artistId);
};

export const getTracksByAlbum = (albumId: string): Track[] => {
  return tracks.filter(track => track.albumId === albumId);
};

export const getTracksByPlaylist = (playlistId: string): Track[] => {
  const playlist = playlists.find(p => p.id === playlistId);
  if (!playlist) return [];
  
  return tracks.filter(track => playlist.tracks.includes(track.id));
};
