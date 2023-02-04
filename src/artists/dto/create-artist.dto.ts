import { IsBoolean, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString({ message: 'name must be a string' })
  name: string;
  @IsBoolean({ message: 'grammy must be a boolean' })
  grammy: boolean;
}
