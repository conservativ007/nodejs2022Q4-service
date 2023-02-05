import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddTrackToFavoriteDto {
  @IsUUID()
  id: string;

  @IsString({ message: 'name must be a string' })
  name: string;

  @IsString({ message: 'artistId must be a string' })
  @IsOptional()
  artistId: string;

  @IsString({ message: 'albumId must be a string' })
  @IsOptional()
  albumId: string;

  @IsNumber()
  duration: number;
}
