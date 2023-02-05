import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
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
  getAllAlbums() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  getAlbumById(
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
  createAlbum(@Body(new ValidationPipe()) dto: CreateAlbumDto) {
    let album = this.albumsService.create(dto);
    return album;
  }

  @Put(':id')
  updateAlbum(
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

  @HttpCode(204)
  @Delete(':id')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.albumDelete(id);
  }
}
