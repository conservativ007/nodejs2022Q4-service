import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesAlbumsEntity } from '../favorites/entity/favoritesAlbum.entity';
import { TracksModule } from '../tracks/tracks.module';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entity/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, FavoritesAlbumsEntity]),
    TracksModule,
  ],
})
export class AlbumsModule {}
