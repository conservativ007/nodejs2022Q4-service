import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksService } from './tracks/tracks.service';
import { TracksModule } from './tracks/tracks.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule, TracksModule],
  controllers: [AppController],
  providers: [AppService, TracksService],
})
export class AppModule {}
