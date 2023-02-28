import { IsJWT, IsString } from 'class-validator';

export class TokenDto {
  @IsJWT()
  refreshToken: string;
}
