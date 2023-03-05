import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { FavoritesArtistsEntity } from '../favorites/entity/favoriteArtist.entity';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { ArtistEntity } from './entity/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity, FavoritesArtistsEntity]),
    TracksModule,
    AlbumsModule,
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
