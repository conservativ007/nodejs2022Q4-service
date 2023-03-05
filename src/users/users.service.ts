import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserEntity } from './entity/user.entity';
import { compare, hash } from 'bcrypt';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async hashData(data: string) {
    return hash(data, 10);
  }

  async updateRtHash(userId: string, rt: string) {
    const hashedRefreshToken = await this.hashData(rt);

    let foundUser = await this.userRepository.findOneBy({
      id: userId,
    });

    if (foundUser === null) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.save({
      ...foundUser,
      hashedRt: hashedRefreshToken,
    });
  }

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create({ login, password }) {
    const hashedPassword = await this.hashData(password);

    const user = {
      login,
      password: hashedPassword,
      version: 1,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    };

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      return user;
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  async getByLogin(login: string, password: string) {
    const user = await this.userRepository.findOneBy({
      login: login,
    });

    if (user === null) {
      throw new HttpException('NOT_FOUND', HttpStatus.FORBIDDEN);
    }

    let isComparedPasswordsTrue = await compare(password, user.password);

    if (isComparedPasswordsTrue === false) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    return user;
  }

  async update(id: string, dto: UpdateUserPasswordDto) {
    const { oldPassword, newPassword } = dto;

    // check body params
    if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }

    // if the user does not find, we will throw the HttpException
    let foundUser: any;
    try {
      foundUser = await this.userRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    let isComparedPasswordsTrue = await compare(
      oldPassword,
      foundUser.password,
    );

    if (isComparedPasswordsTrue === false) {
      throw new HttpException(
        'the old password is wrong!',
        HttpStatus.FORBIDDEN,
      );
    }

    const hashedPassword = await this.hashData(newPassword);

    foundUser.version = foundUser.version += 1;
    foundUser.createdAt = Number(foundUser.createdAt);
    foundUser.updatedAt = Number(new Date());
    foundUser.password = hashedPassword;

    return this.userRepository.save({
      ...foundUser,
    });
  }

  async userDelete(id: string) {
    try {
      await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);
  }
}
