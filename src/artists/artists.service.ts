import { HttpException, Injectable } from '@nestjs/common';
import { DB } from 'src/DB/DB';
import { DBFavorites } from 'src/DB/DBFavorites';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  getAll() {
    return DB.getAll('artists');
  }

  getById(id: string) {
    return DB.getById(id, 'artists');
  }

  create(dto: CreateArtistDto) {
    return DB.createArtist(dto);
  }

  update(id: string, dto: UpdateArtistDto) {
    return DB.updateArtist(id, dto);
  }

  artistDelete(id: string) {
    const isAlbumDeleted = DB.delete(id, 'artists');
    if (isAlbumDeleted === false) {
      throw new HttpException(`Such id: ${id} not found`, 404);
    }

    // in this place we'll delete artistId from track if it's exists
    const track = DB.tracks.find((track) => track.artistId === id);

    if (track !== undefined) {
      track.artistId = null;
      DB.updateTrack(track.id, track);
    }

    // in this place we'll delete artist from favorites artists if it's exists
    const foundIndex = DBFavorites.favorites.artists.findIndex(
      (artist) => artist.id === id,
    );

    if (foundIndex !== -1) {
      DBFavorites.favorites.artists.splice(foundIndex, 1);
    }
  }
}
