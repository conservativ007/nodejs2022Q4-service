import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { newOrmConfig } from './typeOrm.config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
// import { AllExceptionsFilter } from './exceptions/AllExceptionsFilter ';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware/middleware-consumer.interface';
import { LoggerMiddleware } from './logger/LoggerMiddleware';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/common/guards';

@Module({
  imports: [
    TypeOrmModule.forRoot(newOrmConfig),
    UsersModule,
    AlbumsModule,
    TracksModule,
    ArtistsModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
