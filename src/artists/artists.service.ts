import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesArtistsEntity } from '../favorites/entity/favoriteArtist.entity';
import { TracksService } from '../tracks/tracks.service';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entity/artist.entity';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,

    @InjectRepository(FavoritesArtistsEntity)
    private favArtist: Repository<FavoritesArtistsEntity>,

    private trackService: TracksService,
    private albumService: AlbumsService,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string, favorites = false) {
    try {
      const artist = await this.artistRepository.findOneOrFail({
        where: { id },
      });
      return artist;
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

  async create(dto: CreateArtistDto): Promise<ArtistEntity> {
    const newUser = this.artistRepository.create(dto);
    return await this.artistRepository.save(newUser);
  }

  async update(id: string, dto: UpdateArtistDto) {
    let foundArtist: any;
    try {
      foundArtist = await this.artistRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return this.artistRepository.save({
      ...foundArtist,
      ...dto,
    });
  }

  async artistDelete(id: string) {
    try {
      await this.artistRepository.findOneOrFail({ where: { id } });
      await this.artistRepository.delete(id);
    } catch (error) {
      throw new HttpException('such artist ID not', HttpStatus.NOT_FOUND);
    }

    const tracks = await this.trackService.getAll();
    const track = tracks.find((track) => track.artistId === id);

    if (track) {
      track.artistId = null;
      await this.trackService.update(track.id, track);
    }

    await this.favArtist.delete(id);

    const albums = await this.albumService.getAll();
    const album = albums.find((album) => album.artistId === id);

    if (album) {
      album.artistId = null;
      await this.albumService.update(album.id, album);
    }
  }
}
