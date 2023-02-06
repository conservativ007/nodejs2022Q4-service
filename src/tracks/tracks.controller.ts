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
import { TracksService } from './tracks.service';
import { Response } from 'express';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getTrackById(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const track = this.trackService.getById(id);
    if (track === undefined) {
      res.status(404);
      return;
    }
    res.status(200);
    return track;
  }

  @Post()
  createTrack(@Body() dto: CreateTrackDto) {
    const track = this.trackService.create(dto);
    return track;
  }

  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const track = this.trackService.update(id, dto);
    if (track === null) {
      res.status(404);
      return;
    }
    return track;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    this.trackService.trackDelete(id);
  }
}
