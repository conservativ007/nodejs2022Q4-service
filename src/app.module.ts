import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksService } from './tracks/tracks.service';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AlbumsService } from './albums/albums.service';
import { ArtistsService } from './artists/artists.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { ArtistEntity } from './artists/entity/artist.entity';
import { AlbumEntity } from './albums/entity/album.entity';
import { TrackEntity } from './tracks/entity/track.entity';
import { FavoritesArtistsEntity } from './favorites/entity/favoriteArtist.entity';
import { FavoritesAlbumsEntity } from './favorites/entity/favoritesAlbum.entity';
import { FavoritesTracksEntity } from './favorites/entity/favoritesTracks.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          UserEntity,
          ArtistEntity,
          AlbumEntity,
          TrackEntity,
          FavoritesArtistsEntity,
          FavoritesAlbumsEntity,
          FavoritesTracksEntity,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // forwardRef(() => ArtistsModule),
    // forwardRef(() => TracksModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
