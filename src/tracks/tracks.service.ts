import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB/DB';
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
    return DB.delete(id, 'tracks');
  }
}
