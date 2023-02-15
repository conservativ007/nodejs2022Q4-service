import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoritesTracksEntity } from 'src/favorites/entity/favoritesTracks.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entity/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,

    @InjectRepository(FavoritesTracksEntity)
    private favTracks: Repository<FavoritesTracksEntity>,
  ) {}

  async getAll() {
    return await this.trackRepository.find();
  }

  async getById(id: string, favorites = false) {
    try {
      return await this.trackRepository.findOneOrFail({ where: { id } });
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

  async create(dto: CreateTrackDto) {
    const track = this.trackRepository.create(dto);
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
    await this.favTracks.delete(id);
  }
}
