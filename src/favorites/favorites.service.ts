import { Injectable } from '@nestjs/common';
import { DBFavorites } from '../DB/DBFavorites';

@Injectable()
export class FavoritesService {
  getAll() {
    return DBFavorites.getAll();
  }

  addTrackToFavs(dto) {
    return DBFavorites.addTrackToFavorites(dto);
  }

  addAlbumToFavs(dto) {
    return DBFavorites.addAlbumToFavorites(dto);
  }

  addArtistToFavs(dto) {
    return DBFavorites.addArtistToFavorites(dto);
  }

  deleteTrackFromFavs(id: string) {
    return DBFavorites.deleteTrackFromFavs(id);
  }

  deleteArtistFromFavs(id: string) {
    return DBFavorites.deleteArtistFromFavs(id);
  }

  deleteAlbumFromFavs(id: string) {
    return DBFavorites.deleteAlbumFromFavs(id);
  }
}
