import { HttpException, Injectable } from '@nestjs/common';
import { DB } from 'src/DB/DB';
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
    let isAlbumDeleted = DB.delete(id, 'artists');
    if (isAlbumDeleted === false) {
      throw new HttpException(`Such id: ${id} not found`, 404);
    }

    let track = DB.tracks.find((track) => track.artistId === id);

    if (track === undefined) return;

    track.artistId = null;
    DB.updateTrack(track.id, track);
  }
}
