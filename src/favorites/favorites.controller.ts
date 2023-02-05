import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Response } from 'express';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { AddTrackToFavoriteDto } from './dto/create-favs-track.dto';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favsService: FavoritesService,
    private tracksService: TracksService,
    private albumService: AlbumsService,
    private artistService: ArtistsService,
  ) {}

  @Get()
  getAllTracks() {
    return this.favsService.getAll();
  }

  @Post('track/:id')
  addTrackToFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let isExistTrack = this.tracksService.getById(id);

    if (isExistTrack === undefined) {
      res.status(422);
      return;
    }

    this.favsService.addTrackToFavs(isExistTrack);
    res.status(201);
  }

  @Post('album/:id')
  addAlbumToFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let isExistAlbum = this.albumService.getById(id);

    if (isExistAlbum === undefined) {
      res.status(422);
      return;
    }

    this.favsService.addAlbumToFavs(isExistAlbum);
    res.status(201);
  }

  @Post('artist/:id')
  addAArtistToFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let isExistArtist = this.artistService.getById(id);

    if (isExistArtist === undefined) {
      res.status(422);
      return;
    }

    this.favsService.addArtistToFavs(isExistArtist);
    res.status(201);
  }

  @Delete('track/:id')
  deleteTrackFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    // here check if the track exists to DBtracks
    let isExistTrack = this.tracksService.getById(id);

    if (isExistTrack === null) {
      res.status(404);
      return;
    }

    // here check if the track exists to favorites

    let trackFavs = this.favsService.deleteTrackFromFavs(isExistTrack.id);
    if (trackFavs === undefined) {
      res.status(404);
      return;
    }

    res.status(204);
  }

  @Delete('artist/:id')
  deleteArtistFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    // here check if the track exists to DBtracks
    let isExistArtist = this.artistService.getById(id);

    if (isExistArtist === null) {
      res.status(404);
      return;
    }

    // here check if the track exists to favorites

    let artistFavs = this.favsService.deleteArtistFromFavs(isExistArtist.id);
    if (artistFavs === undefined) {
      res.status(404);
      return;
    }

    res.status(204);
  }

  @Delete('album/:id')
  deleteAlbumFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    // here check if the track exists to DBtracks
    let isExistAlbum = this.albumService.getById(id);
    if (isExistAlbum === null) {
      res.status(404);
      return;
    }
    // here check if the track exists to favorites
    let albumFavs = this.favsService.deleteAlbumFromFavs(isExistAlbum.id);
    if (albumFavs === undefined) {
      res.status(404);
      return;
    }
    res.status(204);
  }
}
