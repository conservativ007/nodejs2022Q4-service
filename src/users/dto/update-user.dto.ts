import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  id: string;

  @IsString({ message: 'login must be a string' })
  // @IsOptional()
  login?: string;

  @IsString({ message: 'password must be a string' })
  // @IsOptional()
  password?: string;
}
