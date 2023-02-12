import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBFavorites } from 'src/DB/DBFavorites';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entity/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getById(id: string): Promise<AlbumEntity> {
    try {
      return await this.albumRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreateAlbumDto): Promise<AlbumEntity> {
    let isArtistId = dto.artistId;
    if (isArtistId === undefined) dto.artistId = null;

    let newUser = this.albumRepository.create(dto);
    return await this.albumRepository.save(newUser);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    let foundAlbum: any;
    try {
      foundAlbum = await this.albumRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return this.albumRepository.save({
      ...foundAlbum,
      ...dto,
    });
  }

  async albumDelete(id: string) {
    try {
      await this.albumRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException('such album ID not found', HttpStatus.NOT_FOUND);
    }

    this.albumRepository.delete(id);
    //   const isAlbumDeleted = DB.delete(id, 'albums');
    //   if (isAlbumDeleted === false) {
    //     throw new HttpException(`Such id: ${id} not found`, 404);
    //   }

    //   const track = DB.tracks.find((track) => track.albumId === id);

    //   if (track === undefined) return;

    //   // in this place we'll delete albumId from track if it's exists
    //   track.albumId = null;
    //   DB.updateTrack(track.id, track);

    //   // in this place we'll delete artist from favorites artists if it's exists
    //   const foundIndex = DBFavorites.favorites.albums.findIndex(
    //     (album) => album.id === id,
    //   );

    //   if (foundIndex !== -1) {
    //     DBFavorites.favorites.albums.splice(foundIndex, 1);
    //   }
  }
}
