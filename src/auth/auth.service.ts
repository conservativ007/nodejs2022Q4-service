import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { Tokens, UserPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import 'dotenv/config';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private authRepository: Repository<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);

    let foundUser: any;
    try {
      foundUser = await this.authRepository.findOneOrFail({
        where: { id: userId },
      });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.authRepository.save({
      ...foundUser,
      hashedRt: hash,
    });
  }

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

  async singup(dto: AuthDto) {
    console.log(JWT_SECRET_KEY);
    const hash = await this.hashData(dto.password);

    let newUser = this.authRepository.create({
      login: dto.login,
      password: hash,
    });

    await this.authRepository.save(newUser);
  }

  async login(dto: AuthDto): Promise<Tokens> {
    let user = await this.authRepository.findOne({
      where: { login: dto.login },
    });

    if (!user)
      throw new HttpException(
        'try entering the correct parameters',
        HttpStatus.NOT_FOUND,
      );

    const comparePassword = await bcrypt.compare(dto.password, user.password);
    if (!comparePassword)
      throw new ForbiddenException('try entering the correct parameters');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refresh(token: string): Promise<Tokens> {
    const { userId, exp } = verify(
      token,
      JWT_SECRET_REFRESH_KEY,
    ) as UserPayload;

    if (Date.now() >= exp * 1000)
      throw new ForbiddenException('token is wrong');

    let user = await this.authRepository.findOne({ where: { id: userId } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const rtCompare = await bcrypt.compare(token, user.hashedRt);
    if (!rtCompare) throw new ForbiddenException('bcrypt compare fails');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }
}
