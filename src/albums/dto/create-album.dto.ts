import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString({ message: 'name must be a string' })
  name: string;

  @IsNumber()
  year: number;

  @IsUUID()
  @IsOptional()
  artistId: string;
}
