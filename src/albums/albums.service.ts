import { Injectable } from '@nestjs/common';
import { DB } from 'src/DB';
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
    return DB.delete(id, 'albums');
  }
}
