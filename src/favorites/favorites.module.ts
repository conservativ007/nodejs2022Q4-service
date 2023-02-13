import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksModule } from 'src/tracks/tracks.module';
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
