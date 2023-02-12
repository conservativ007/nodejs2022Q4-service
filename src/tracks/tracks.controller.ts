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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { clearConfigCache } from 'prettier';

@Controller('track')
export class TracksController {
  constructor(private trackService: TracksService) {}

  @HttpCode(200)
  @Get()
  getAllTracks() {
    return this.trackService.getAll();
  }

  @HttpCode(200)
  @Get(':id')
  getTrackById(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.getById(id);
    return track;
  }

  @Post()
  createTrack(@Body() dto: CreateTrackDto) {
    const track = this.trackService.create(dto);
    return track;
  }

  @HttpCode(200)
  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ) {
    const track = this.trackService.update(id, dto);
    return track;
  }

  @HttpCode(204)
  @Delete(':id')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    // console.log('from delete track controller');
    return this.trackService.trackDelete(id);
  }
}
