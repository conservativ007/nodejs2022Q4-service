import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entity/track.entity';
import { FavoritesTracksEntity } from '../favorites/entity/favoritesTracks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, FavoritesTracksEntity])],
  providers: [TracksService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
