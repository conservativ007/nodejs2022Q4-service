import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DB } from 'src/DB/DB';
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
    // return DB.getAll('users');
    return this.userRepository.find();
  }

  async create(dto: CreateUserDto): Promise<UserEntity> {
    let user = {
      ...dto,
      version: 1,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    };

    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    return user;
  }

  async update(id: string, dto: UpdateUserPasswordDto) {
    const { oldPassword, newPassword } = dto;

    // check body params
    if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
      throw new HttpException(
        `you must enter oldPassword and newPassword and it's must be a string`,
        400,
      );
    }

    // is user exist
    // const foundUser = DB.users.find((user) => user.id === id);
    // if (foundUser === undefined) {
    //   throw new HttpException(`user not found`, 404);
    // }

    // if the user does not find, will throw the HttpException
    const foundUser = await this.userRepository.findOneOrFail({
      where: { id },
    });

    // compare passwords
    const comparePasswords = foundUser.password === oldPassword;
    if (comparePasswords === false) {
      throw new Error('the 403 status code');
      // I must to change the error func,
      // it must be a 403 status code
      // throw new HttpException(`you must enter valid old password`, 403);
    }

    return this.userRepository.save({
      ...foundUser,
      password: newPassword,
    });

    return DB.update(id, dto);
  }

  async userDelete(id: string) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    if (user) this.userRepository.delete(id);
  }
}
