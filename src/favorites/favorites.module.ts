import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from '../albums/albums.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { FavoritesArtistsEntity } from './entity/favoriteArtist.entity';
import { FavoritesAlbumsEntity } from './entity/favoritesAlbum.entity';
import { FavoritesTracksEntity } from './entity/favoritesTracks.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesArtistsEntity,
      FavoritesAlbumsEntity,
      FavoritesTracksEntity,
    ]),
    TracksModule,
    AlbumsModule,
    ArtistsModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
