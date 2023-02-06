import { HttpException, Injectable } from '@nestjs/common';
import { DB } from 'src/DB/DB';
import { DBFavorites } from 'src/DB/DBFavorites';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  getAll() {
    return DB.getAll('tracks');
  }

  getById(id: string) {
    return DB.getById(id, 'tracks');
  }

  create(dto: CreateTrackDto) {
    return DB.createTrack(dto);
  }

  update(id: string, dto: UpdateTrackDto) {
    return DB.updateTrack(id, dto);
  }

  trackDelete(id: string) {
    const isTrackDeted = DB.delete(id, 'tracks');

    if (isTrackDeted === false) {
      throw new HttpException(`Such id: ${id} not found`, 404);
    }

    // in this place we'll delete tracks from favorites tracks if it's exists
    const foundIndex = DBFavorites.favorites.tracks.findIndex(
      (track) => track.id === id,
    );

    if (foundIndex !== -1) {
      DBFavorites.favorites.tracks.splice(foundIndex, 1);
    }
  }
}
