import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB';
import { AddTrackToFavoriteDto } from './dto/create-favs-track.dto';

@Injectable()
export class FavoritesService {
  getAll() {
    return DB.getAll('favorites');
  }

  addTrackToFavs(dto) {
    return DB.addTrackToFavorites(dto);
  }

  addAlbumToFavs(dto) {
    return DB.addAlbumToFavorites(dto);
  }

  addArtistToFavs(dto) {
    return DB.addArtistToFavorites(dto);
  }

  deleteTrackFromFavs(id: string) {
    return DB.deleteTrackFromFavs(id);
  }

  deleteArtistFromFavs(id: string) {
    return DB.deleteArtistFromFavs(id);
  }

  deleteAlbumFromFavs(id: string) {
    return DB.deleteAlbumFromFavs(id);
  }
}
