import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AlbumEntity } from './src/albums/entity/album.entity';
import { ArtistEntity } from './src/artists/entity/artist.entity';
import { FavoritesArtistsEntity } from './src/favorites/entity/favoriteArtist.entity';
import { FavoritesAlbumsEntity } from './src/favorites/entity/favoritesAlbum.entity';
import { FavoritesTracksEntity } from './src/favorites/entity/favoritesTracks.entity';
import { TrackEntity } from './src/tracks/entity/track.entity';
import { UserEntity } from './src/users/entity/user.entity';
import { migrateFile1676882237703 } from './migrations/1676882237703-migrateFile';

config();

const configService = new ConfigService();

// needs to forRoot typeOrm module
export const newOrmConfig: DataSourceOptions = {
  type: 'postgres',
  // host: 'localhost',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [
    AlbumEntity,
    ArtistEntity,
    FavoritesArtistsEntity,
    FavoritesAlbumsEntity,
    FavoritesTracksEntity,
    TrackEntity,
    UserEntity,
  ],
  migrations: [migrateFile1676882237703],
};

// needs to migration actions
export const dataSource = new DataSource(newOrmConfig);
