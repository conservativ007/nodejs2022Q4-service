import { HttpException, Injectable } from '@nestjs/common';
import { DB } from 'src/DB/DB';
import { CreateUserDto } from './dto/create-user.dto.ts';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  getAll() {
    return DB.getAll('users');
  }

  create(dto: CreateUserDto) {
    return DB.createUser(dto);
  }

  getById(id: string) {
    return DB.getById(id, 'users');
  }

  update(id: string, dto: UpdateUserPasswordDto) {
    let { oldPassword, newPassword } = dto;

    // check body params
    if (typeof oldPassword !== 'string' || typeof newPassword !== 'string') {
      throw new HttpException(
        `you must enter oldPassword and newPassword and it's must be a string`,
        400,
      );
    }

    // is user exist
    let foundUser = DB.users.find((user) => user.id === id);
    if (foundUser === undefined) {
      throw new HttpException(`user not found`, 404);
    }

    // compare passwords
    let comparePasswords = foundUser.password === oldPassword;
    if (comparePasswords === false) {
      throw new HttpException(`you must enter valid old password`, 403);
    }

    return DB.update(id, dto);
  }

  userDelete(id: string) {
    return DB.delete(id, 'users');
  }
}
