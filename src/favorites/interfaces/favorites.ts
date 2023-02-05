export interface addTrackToFavorites {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}

export interface addAlbumToFavorites {
  id: string;
  name: string;
  year: number;
  artistId: string;
}
