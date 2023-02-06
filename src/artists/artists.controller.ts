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
  getArtistById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const artist = this.artistService.getById(id);
    if (artist === undefined) {
      res.status(404);
      return;
    }
    res.status(200);
    return artist;
  }

  @Post()
  createUser(@Body() dto: CreateArtistDto) {
    const user = this.artistService.create(dto);
    return user;
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateArtistDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const artist = this.artistService.update(id, dto);
    if (artist === null) {
      res.status(404);
      return;
    }
    return artist;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteUSer(@Param('id', ParseUUIDPipe) id: string) {
    this.artistService.artistDelete(id);
  }
}
