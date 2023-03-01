import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Tokens, UserPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto.ts';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: JWT_SECRET_KEY,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        { userId, login },
        {
          secret: JWT_SECRET_REFRESH_KEY,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async singup(dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  async login(dto: CreateUserDto): Promise<Tokens> {
    let user = await this.userService.getByLogin(dto.login, dto.password);

    const tokens = await this.getTokens(user.id, user.login);
    await this.userService.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refresh(token: string): Promise<Tokens> {
    const { userId, exp } = verify(
      token,
      JWT_SECRET_REFRESH_KEY,
    ) as UserPayload;

    if (Date.now() >= exp * 1000)
      throw new ForbiddenException('token is wrong');

    let user = await this.userService.getById(userId);

    const rtCompare = await bcrypt.compare(token, user.hashedRt);
    if (!rtCompare) throw new ForbiddenException('bcrypt compare fails');

    const tokens = await this.getTokens(user.id, user.login);
    await this.userService.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
