import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB';
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
    return DB.delete(id, 'artists');
  }
}
