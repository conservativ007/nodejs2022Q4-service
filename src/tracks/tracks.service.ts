import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DB } from 'src/DB/DB';
import { DBFavorites } from 'src/DB/DBFavorites';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entity/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string) {
    try {
      return await this.trackRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreateTrackDto) {
    let track = this.trackRepository.create(dto);
    return await this.trackRepository.save(track);
  }

  async update(id: string, dto: UpdateTrackDto) {
    let foundTrack: any;

    try {
      foundTrack = await this.trackRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return await this.trackRepository.save({ ...foundTrack, ...dto });
  }

  async trackDelete(id: string) {
    try {
      await this.trackRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException('track not found', HttpStatus.NOT_FOUND);
    }

    await this.trackRepository.delete(id);

    //   const isTrackDeted = DB.delete(id, 'tracks');

    //   if (isTrackDeted === false) {
    //     throw new HttpException(`Such id: ${id} not found`, 404);
    //   }

    //   // in this place we'll delete tracks from favorites tracks if it's exists
    //   const foundIndex = DBFavorites.favorites.tracks.findIndex(
    //     (track) => track.id === id,
    //   );

    //   if (foundIndex !== -1) {
    //     DBFavorites.favorites.tracks.splice(foundIndex, 1);
    //   }
  }
}
