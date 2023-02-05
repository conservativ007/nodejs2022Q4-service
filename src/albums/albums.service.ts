import { HttpException, Injectable } from '@nestjs/common';
import { DB } from 'src/DB/DB';
import { DBFavorites } from 'src/DB/DBFavorites';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  getAll() {
    return DB.getAll('albums');
  }

  getById(id: string) {
    return DB.getById(id, 'albums');
  }

  create(dto: CreateAlbumDto) {
    return DB.createAlbum(dto);
  }

  update(id: string, dto: UpdateAlbumDto) {
    return DB.updateAlbum(id, dto);
  }

  albumDelete(id: string) {
    let isAlbumDeleted = DB.delete(id, 'albums');
    if (isAlbumDeleted === false) {
      throw new HttpException(`Such id: ${id} not found`, 404);
    }

    let track = DB.tracks.find((track) => track.albumId === id);

    if (track === undefined) return;

    // in this place we'll delete albumId from track if it's exists
    track.albumId = null;
    DB.updateTrack(track.id, track);

    // in this place we'll delete artist from favorites artists if it's exists
    let foundIndex = DBFavorites.favorites.albums.findIndex(
      (album) => album.id === id,
    );

    if (foundIndex !== -1) {
      DBFavorites.favorites.albums.splice(foundIndex, 1);
    }
  }
}
