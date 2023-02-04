import { Injectable } from '@nestjs/common';
import { DBUsers } from 'src/DB';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  getAll() {
    return DBUsers.getAll('artists');
  }

  getById(id: string) {
    return DBUsers.getById(id, 'artists');
  }

  create(dto: CreateArtistDto) {
    return DBUsers.createArtist(dto);
  }

  update(id: string, dto: UpdateArtistDto) {
    return DBUsers.updateArtist(id, dto);
  }

  artistDelete(id: string) {
    return DBUsers.delete(id, 'artists');
  }
}
