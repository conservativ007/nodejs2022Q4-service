import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { Response } from 'express';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAllUsers() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let artist = this.albumsService.getById(id);
    if (artist === undefined) {
      res.status(404);
      return;
    }
    res.status(200);
    return artist;
  }

  @Post()
  createUser(@Body(new ValidationPipe()) dto: CreateAlbumDto) {
    let user = this.albumsService.create(dto);
    return user;
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) dto: UpdateAlbumDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    let album = this.albumsService.update(id, dto);
    if (album === null) {
      res.status(404);
      return;
    }
    return album;
  }

  @Delete(':id')
  deleteUSer(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let isAlbumDeleted = this.albumsService.albumDelete(id);
    if (isAlbumDeleted === true) {
      res.status(204);
      return;
    }
    res.status(404);
  }
}
