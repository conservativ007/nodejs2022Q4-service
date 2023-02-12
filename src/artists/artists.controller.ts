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
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Response } from 'express';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get()
  getAllUsers() {
    return this.artistService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.artistService.getById(id);
    return artist;
  }

  @Post()
  createUser(@Body() dto: CreateArtistDto) {
    const user = this.artistService.create(dto);
    return user;
  }

  @HttpCode(200)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    const artist = this.artistService.update(id, dto);
    return artist;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteUSer(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.artistDelete(id);
  }
}
