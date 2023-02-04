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
    let artist = this.artistService.getById(id);
    if (artist === undefined) {
      res.status(404);
      return;
    }
    res.status(200);
    return artist;
  }

  @Post()
  createUser(@Body(new ValidationPipe()) dto: CreateArtistDto) {
    let user = this.artistService.create(dto);
    return user;
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ValidationPipe()) dto: UpdateArtistDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    let isArtistExist = this.artistService.getById(id);
    console.log(isArtistExist);

    let artist = this.artistService.update(id, dto);

    // if (Object.keys(dto).length === 0) {
    //   res.status(400);
    //   return;
    // }

    if (artist === null) {
      res.status(404);
      return;
    }

    return artist;
  }

  @Delete(':id')
  deleteUSer(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let isUserDeleted = this.artistService.artistDelete(id);
    if (isUserDeleted === true) {
      res.status(204);
      return;
    }
    res.status(404);
  }
}
