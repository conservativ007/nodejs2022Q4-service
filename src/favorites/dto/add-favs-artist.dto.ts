import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AddArtistToFavoriteDto {
  @IsUUID()
  id: string;

  @IsString({ message: 'name must be a string' })
  name: string;

  @IsBoolean({ message: 'grammy must be a boolean' })
  grammy: boolean;
}
