import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favsService: FavoritesService) {}

  @Get()
  getAllTracks() {
    return this.favsService.getAll();
  }

  @HttpCode(201)
  @Post('track/:id')
  addTrackToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @HttpCode(201)
  @Post('album/:id')
  addAlbumToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @HttpCode(201)
  @Post('artist/:id')
  addAArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtistToFavs(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  deleteTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteTrackFromFavs(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  deleteArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteArtistFromFavs(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  deleteAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteAlbumFromFavs(id);
  }
}
