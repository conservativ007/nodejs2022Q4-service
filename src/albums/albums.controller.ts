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
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  getAllAlbums() {
    return this.albumsService.getAll();
  }

  @HttpCode(200)
  @Get(':id')
  getAlbumById(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumsService.getById(id);
    return album;
  }

  @Post()
  createAlbum(@Body() dto: CreateAlbumDto) {
    const album = this.albumsService.create(dto);
    return album;
  }

  @HttpCode(200)
  @Put(':id')
  updateAlbum(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ) {
    const album = this.albumsService.update(id, dto);
    return album;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.albumDelete(id);
  }
}
