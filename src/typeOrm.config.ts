import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AlbumEntity } from './albums/entity/album.entity';
import { ArtistEntity } from './artists/entity/artist.entity';
import { FavoritesArtistsEntity } from './favorites/entity/favoriteArtist.entity';
import { FavoritesAlbumsEntity } from './favorites/entity/favoritesAlbum.entity';
import { FavoritesTracksEntity } from './favorites/entity/favoritesTracks.entity';
import { TrackEntity } from './tracks/entity/track.entity';
import { UserEntity } from './users/entity/user.entity';
import { migrateFile1676882237703 } from '../migrations/1676882237703-migrateFile';
import { AuthEntity } from 'src/auth/entity/auth.entity';

config();

const configService = new ConfigService();

// needs to forRoot typeOrm module
export const newOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  // host: configService.get('POSTGRES_HOST'),
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
    AuthEntity,
  ],
  migrations: [migrateFile1676882237703],
};

// needs to migration actions
export const dataSource = new DataSource(newOrmConfig);
