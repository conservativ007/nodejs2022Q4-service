import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesArtistsEntity } from 'src/favorites/entity/favoriteArtist.entity';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entity/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity, FavoritesArtistsEntity]),
    TracksModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
