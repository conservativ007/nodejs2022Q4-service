import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { newOrmConfig } from './common/typeOrm.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { LoggerMiddleware } from './common/logger/LoggerMiddleware';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/common/guards';
import { CustomExceptionFilter } from './common/exceptions/CustomExceptionFilter';
import { LoggerModule } from './common/logger/loger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(newOrmConfig),
    UsersModule,
    AlbumsModule,
    TracksModule,
    ArtistsModule,
    FavoritesModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
