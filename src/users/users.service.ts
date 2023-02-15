import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = {
      ...dto,
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

    // compare passwords
    const comparePasswords = foundUser.password === oldPassword;
    if (comparePasswords === false) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    foundUser.version = foundUser.version += 1;
    foundUser.createdAt = Number(foundUser.createdAt);
    foundUser.updatedAt = Number(new Date());

    return this.userRepository.save({
      ...foundUser,
      password: newPassword,
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
