import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBFavorites } from 'src/DB/DBFavorites';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entity/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) {}

  async getAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async getById(id: string) {
    try {
      const artist = await this.artistRepository.findOneOrFail({
        where: { id },
      });
      return artist;
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreateArtistDto): Promise<ArtistEntity> {
    let newUser = this.artistRepository.create(dto);
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
    } catch (error) {
      throw new HttpException('such artist ID not', HttpStatus.NOT_FOUND);
    }

    this.artistRepository.delete(id);

    // // in this place we'll delete artistId from track if it's exists
    // const track = DB.tracks.find((track) => track.artistId === id);

    // if (track !== undefined) {
    //   track.artistId = null;
    //   DB.updateTrack(track.id, track);
    // }

    // // in this place we'll delete artist from favorites artists if it's exists
    // const foundIndex = DBFavorites.favorites.artists.findIndex(
    //   (artist) => artist.id === id,
    // );

    // if (foundIndex !== -1) {
    //   DBFavorites.favorites.artists.splice(foundIndex, 1);
    // }
  }
}
