import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddAlbumToFavoriteDto {
  @IsUUID()
  id: string;

  @IsString({ message: 'name must be a string' })
  name: string;

  @IsNumber()
  year: number;

  @IsString({ message: 'artistId must be a string' })
  @IsOptional()
  artistId: string;
}
