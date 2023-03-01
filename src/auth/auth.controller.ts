import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './common/decorators';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Public()
  @Post('signup')
  async singup(@Body() dto: AuthDto) {
    return await this.authService.singup(dto);
  }

  @HttpCode(200)
  @Public()
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<Tokens> {
    return await this.authService.login(dto);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() dto: TokenDto): Promise<Tokens> {
    return await this.authService.refresh(dto.refreshToken);
  }
}
