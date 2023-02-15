import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesAlbumsEntity } from 'src/favorites/entity/favoritesAlbum.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entity/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    @InjectRepository(FavoritesAlbumsEntity)
    private albumFavs: Repository<FavoritesAlbumsEntity>,
    private trackService: TracksService,
  ) {}

  async getAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async getById(id: string, favorites = false): Promise<AlbumEntity> {
    try {
      return await this.albumRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      if (favorites === false) {
        throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'UNPROCESSABLE_ENTITY',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async create(dto: CreateAlbumDto): Promise<AlbumEntity> {
    const isArtistId = dto.artistId;
    if (isArtistId === undefined) dto.artistId = null;

    const newUser = this.albumRepository.create(dto);
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

    await this.albumRepository.delete(id);

    const tracks = await this.trackService.getAll();
    const track = tracks.find((track) => track.albumId === id);

    if (track) {
      track.albumId = null;
      await this.trackService.update(track.id, track);
    }

    await this.albumFavs.delete(id);
  }
}
